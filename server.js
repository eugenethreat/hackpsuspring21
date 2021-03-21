const express = require("express");
const app = express();
const axios = require("axios");
var querystring = require("querystring");
const generate = require("csv-generate");

var fs = require("fs");

app.use(express.static("CLIENT_VIEWS"));
//now can use any files in "client_views"

// Add headers (CORS)
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
/* 
this is where server-related code will be 
for sending things to the ML models
*/

// let spotifyId = "9cada7ab405946399f5d7fafe7cacfb0";
// let spotifySecret = "7535f3478e0a4befbc4529e56eb3c0ee";

//sample http request that auths to spotify and redirects to live site
//https://accounts.spotify.com/authorize?client_id=9cada7ab405946399f5d7fafe7cacfb0&response_type=code&redirect_uri=https://extreme-gecko-308201.ue.r.appspot.com/index.html&scope=user-read-private%20user-read-email&state=34fFs29kd09

app.get("/test", (req, res) => {
  res.send("testtt");
});

//needs to be GET
app.get("/getcode", (req, res) => {
  console.log("getting code...");
  //get the fucking code
  let spotifyId = "9cada7ab405946399f5d7fafe7cacfb0";
  let spotifySecret = "7535f3478e0a4befbc4529e56eb3c0ee";

  //    axios.get("https://accounts.spotify.com/authorize?client_id=9cada7ab405946399f5d7fafe7cacfb0&response_type=code&redirect_uri=https://extreme-gecko-308201.ue.r.appspot.com/index.html&scope=user-read-private%20user-read-email&state=34fFs29kd09")

  //step 1: make sure auth code is contained in current url
  // NEED TO MAKE SURE CODE IS SNET IN /GETCODE
  let authcode = req.query.authcode;

  console.log("authcode");
  console.log(authcode);

  let apiResponse = "should be filled with band data";

  //step 2: exchange code for access tokens:
  let accessTokenUrl = "https://accounts.spotify.com/api/token";

  let playlistids = [];
  let listoftracks = [];
  let audioFeatures = [];

  axios
    .post(
      accessTokenUrl,
      querystring.stringify({
        grant_type: "authorization_code",
        code: authcode,
        redirect_uri:
          //"https://extreme-gecko-308201.ue.r.appspot.com/accountPage.html",
          "http://localhost:8080/accountPage.html",
        client_id: spotifyId,
        client_secret: spotifySecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          //https://github.com/spotify/web-api/issues/321#issuecomment-509769813
          //https://stackoverflow.com/questions/48947586/415-coming-back-from-requesting-a-token-spotify-api/48947993
        },
      }
    )
    .then(function (response) {
      console.log("getting final token from spotify");
      //step 3: try and query the api with the code

      console.log("auth request data");
      //console.log(response.data);

      let accesstoken = response.data.access_token;

      console.log(accesstoken);
      //this is where the bulk of api requests will be

      /*
          Planning -- what API calls do we need to make?
          
          1) get all the songs in the user's library
            all songs in all playlists 

          2) for each of those songs, get audio features 
            acousticness
            danceability
            duration_ms
            energy
            instrumentalness
            key
            liveness
            loudness
            speechiness
            tempo
            time_signature
            valence
            song_title
            artist
          
          3) format all those features for each song into a csv for 
          the model 
            */

      let playlist2url = "https://api.spotify.com/v1/me/playlists";
      //returns a lists of playlists -- get their ids

      const playlist2Req = axios.get(playlist2url, {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      });

      //getting playlists
      axios
        .get(playlist2url, {
          headers: {
            Authorization: "Bearer " + accesstoken,
          },
        })
        .then(function (response) {
          //for each playlist, get the id
          let playlists = response.data.items;
          playlists.forEach((playlist) => {
            let strippedId = playlist.id.toString().replace("}", "");
            playlistids.push(strippedId);
            console.log(playlist.id);
          });

          console.log(
            "done with playlists------------------------------------"
          );

          //next...get all tracks from each playlist

          playlists
            .forEach((playlist) => {
              currId = playlist.id;
              let playlistitemsUrl = `https://api.spotify.com/v1/playlists/${currId}/tracks`;
              //included an extra } ffs
              axios
                .get(playlistitemsUrl, {
                  headers: {
                    Authorization: "Bearer " + accesstoken,
                  },
                })
                .then(function (response) {
                  console.log("got a new playlist!");
                  //console.log(response.data.items.track.name.toString());

                  let everytrack = response.data.items;

                  //getting all tracks from playlists
                  everytrack.forEach((track) => {
                    //listoftracks.push(track.track.id);
                    let trackId = track.track.id;
                    let trackName = track.track.name;
                    let trackArtist = JSON.stringify(track.track.artists);

                    console.log(
                      trackId +
                        " " +
                        trackName +
                        " " +
                        track.track.artists.toString()
                    );

                    let toPush = {
                      id: trackId,
                      name: trackName,
                      artist: trackArtist,
                    };

                    listoftracks.push(toPush);
                  });

                  /*
 const playlist2Req = axios.get(playlist2url, {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      });
*/

                  //getting audio features...
                  listoftracks.forEach((anotherTrack) => {
                    //anotherTrack == track id
                    let anotherTrackId = anotherTrack.id;
                    //id, name, artist

                    let audiofeatureUrl = `https://api.spotify.com/v1/audio-features/${anotherTrackId}`;
                    axios
                      .get(audiofeatureUrl, {
                        headers: {
                          Authorization: "Bearer " + accesstoken,
                        },
                      })
                      .then(function (response) {
                        // handle success

                        let featuresAndArtist = {
                          features: response.data,
                          trackTitle: anotherTrack.name,
                          artistName: anotherTrack.artist,
                          //anotherTrack.name + " " + anotherTrack.artist.name,
                        };

                        let features = JSON.stringify(featuresAndArtist);
                        audioFeatures.push(features);

                        console.log(features);

                        //************************************************* */

                        //I am very unsure of why it sends variable output instead of the entire library -- oh well...
                        let profileurl = "https://api.spotify.com/v1/me";

                        axios
                          .get(profileurl, {
                            headers: {
                              Authorization: "Bearer " + accesstoken,
                            },
                          })
                          .then(function (response) {
                            console.log("finally...!");
                            console.log("this is sending the request back ");
                            // apiResponse = response.data.display_name;

                            // let apiResponseString = JSON.stringify(
                            //   response.data
                            // );

                            let apiResponseString = JSON.stringify(
                              audioFeatures
                            );

                            //write a text file that has the songs in it
                            //stupid http headers
                            fs.writeFile(
                              "CLIENT_VIEWS/songs.txt",
                              apiResponseString,
                              function (err) {
                                if (err) throw err;
                                //console.log("Saved!");
                              }
                            );
                            res.send(apiResponseString);
                            //sends API response as a string
                          })
                          .catch(function (error) {
                            // handle error
                            console.log(error);
                          })
                          .then(function () {})
                          .catch(function (error) {
                            // handle error
                            console.log(error);
                            console.log("didn't work...");
                          })
                          .then(function () {
                            // always executed
                          });
                      })
                      .catch(function (error) {
                        // handle error
                        console.log(error);
                      })
                      .then(function () {
                        // always executed
                      });
                  });

                  //items.track.id

                  //sends API response as a string
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .then(function () {
                  //at the end of everything...
                  // always executed
                });
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              res.send(error.toString());
            })
            .then(function () {
              // always executed
            });
        });

      // const playlist2Req = axios.get(playlist2url, {
      //   headers: {
      //     Authorization: "Bearer " + accesstoken,
      //   },
      // });
      // const playlist2Req = axios.get(playlist2url, {
      //   headers: {
      //     Authorization: "Bearer " + accesstoken,
      //   },
      // });
      // always executed
    });
});

app.get("/makecsv", (req, res) => {
  console.log("making csv");

  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "CLIENT_VIEWS/out.csv",
    header: [
      { id: "acousticness", title: "acousticness" },
      { id: "danceability", title: "danceability" },
      { id: "energy", title: "energy" },
      { id: "instrumentalness", title: "instrumentalness" },
      { id: "liveness", title: "liveness" },
      { id: "loudness", title: "loudness" },
      { id: "speechiness", title: "speechiness" },
      { id: "tempo", title: "tempo" },
      { id: "valence", title: "valence" },
      { id: "song_title", title: "song_title" },
      { id: "artist", title: "artist" },
    ],
  });

  let songsJson = {};

  fs.readFile("CLIENT_VIEWS/songs.txt", "utf8", function (err, data) {
    const toPush = [];

    // Display the file content
    console.log("songs.txt");
    //console.log(data);

    songsJson = JSON.parse(data);
    //json array of all the songs
    //console.log(songsJson[1]);

    // const data = []

    /*
'{"features":
{"danceability":0.766,
"energy":0.809,
"key":1,
"loudness":-6.123,
"mode":1,
"speechiness":0.279,"
acousticness":0.0011,
"instrumentalness":0,
"liveness":0.168,
"valence":0.325,
"tempo":130.127,
"type":"audio_features","
id":"722tgOgdIbNe3BEyLnejw4",
"uri":"spotify:track:722tgOgdIbNe3BEyLnejw4",
"track_href":"https://api.spotify.com/v1/tracks/722tgOgdIbNe3BEyLnejw4",
"analysis_url":"https://api.spotify.com/v1/audio-analysis/722tgOgdIbNe3BEyLnejw4",
"duration_ms":188013,"time_signature":4
},
"trackTitle":"Black Skinhead",
"artistName":"[{\\"external_urls\\":{\\"spotify\\":\\"https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x\\"},\\"href\\":\\"https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x\\",\\"id\\":\\"5K4W6rqBFWDnAN6FQUkS6x\\",\\"name\\":\\"Kanye West\\",\\"type\\":\\"artist\\",\\"uri\\":\\"spotify:artist:5K4W6rqBFWDnAN6FQUkS6x\\"}]"}',
*/

    songsJson.forEach((song) => {
      let jsonSongObject = JSON.parse(song);

      // console.log(jsonSongObject.artistName);

      let thingy = jsonSongObject.artistName.toString()
      let json2 = JSON.parse(thingy)
      console.log(json2[0].name)
      // console.log(json2.name.toString())
      /*
 { id: "acousticness", title: "acousticness" },
      { id: "danceability", title: "danceability" },
      { id: "energy", title: "energy" },
      { id: "instrumentalness", title: "instrumentalness" },
      { id: "liveness", title: "liveness" },
      { id: "loudness", title: "loudness" },
      { id: "speechiness", title: "speechiness" },
      { id: "tempo", title: "tempo" },
      { id: "valence", title: "valence" },
      { id: "song_title", title: "song_title" },
      { id: "artist", title: "artist" },
*/
      toPush.push({
        acousticness: jsonSongObject.features.acousticness,
        danceability: jsonSongObject.features.danceability,
        energy: jsonSongObject.features.energy,
        instrumentalness: jsonSongObject.features.instrumentalness,
        liveness: jsonSongObject.features.liveness,
        loudness: jsonSongObject.features.loudness,
        speechiness: jsonSongObject.features.speechiness,
        tempo: jsonSongObject.features.tempo,
        valence: jsonSongObject.features.valence,
        song_title: jsonSongObject.trackTitle,
        artist: json2[0].name,
      });
    });

    csvWriter
      .writeRecords(toPush)
      .then(() => console.log("The CSV file was written successfully"));

    res.send("made on the server");
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

/*
axios.get(bigurl)

    .then(function (response) {
      // handle success
      //    let somebody = JSON.stringify(response);
      //   res.redirect(
      //     "https://accounts.spotify.com/authorize?" +
      //       querystring.stringify({
      //         response_type: "code",
      //         client_id: client_id,
      //         redirect_uri: redirect_uri,
      //       })
      //   );

      res.send("AAAAAAA");
    })
    .catch(function (error) {
      // handle error
      res.send("did not work");
    })
    .then(function () {
      // always executed
      console.log("we got it!");
    });
*/

/*
C:\Users\eugene>curl -X POST "https://accounts.spotify.com/api/token" 
-d 
"grant_type=authorization_code
&redirect_uri=https://extreme-gecko-308201.ue.r.appspot.com/accountPage.html
&client_id=9cada7ab405946399f5d7fafe7cacfb0
&code=AQDnPFYONFNmGIbTHS1fe7_nrB4zdfC143fGV2rMeOKF_giieg-pGIOtGF-xHg1PazUlxh3GegSjIPJWWfTASud7PZNSTCmCXS0in2bBpAJiu1PJzimuh5Z-QMI7uIgXL7no34lpdfdyXI6vlzkGWeIrLQknXlVEo4dpVqToXlzesg2EQ1-6QaDl2cnhQDHD1GdMF-aopQnN7M7PajNJ9a2NChDqChjILWhXpddgfNgdiGc7Ztsce3nHurRB1HfqY1mhexMK
&client_secret=7535f3478e0a4befbc4529e56eb3c0ee"

{"access_token":"BQC4AXovK7pRok64Oht2W3k-T3STU37DOII-29NAAZxIsSnS2nBuSjp0tzdfG3ff5nfnxRbg0Cl2lQjbD4tsW6NM0jMdQ7V1ChhQpSjwCzsjC0DjhSbE4pUozHxMADC1UJRaZsDeGOmFlh-yjTiRzoms7VcQ3pMIYyJMz9o","token_type":"Bearer","expires_in":3600,"refresh_token":"AQCjJ3kT_BSJkXU0ZQwKuJYBbhO93zyxwchQ8IQPsu5sDn_FHM9wh3Q4GdHysXYoulwJH7LnkZzy0IddtG48y93j-hKyBev8bxU71lI9AU-5HhF9wYtnUNSLd7FO8qwN6V4","scope":"user-read-email user-read-private"}
*/
