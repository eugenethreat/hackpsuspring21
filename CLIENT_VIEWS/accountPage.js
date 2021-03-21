let songsArray = []

function getApi() {
  //let url = "https://localhost:8080/getcode";

  //get code from...

  //let url = "https://extreme-gecko-308201.ue.r.appspot.com/getcode";
  let url = "http://localhost:8080/getcode";
  let currentUrl = window.location.href;

  //splitting the current url to get the access code
  console.log(currentUrl);

  let splitUrl = currentUrl.split("?");
  let code = splitUrl[1];
  let splitCode = code.split("state");
  code = splitCode[0];
  code = code.replace("&", "");
  code = code.replace("code=", "");

  console.log(code);

  axios
    .get(url, {
      params: {
        authcode: code,
      },
    })

    .then(function (response) {
      // handle success
      console.log(response);
      let audioFeatures = response.data;

      // let nameField = document.querySelector("#content");
      // nameField.innerHTML = "uid: " + response.data[0];

      // var btn = document.createElement("BUTTON"); // Create a <button> element
      // btn.innerHTML = "generate csv"; // Insert text
      // btn.outerHTML = "onclick='test'"
      // document.querySelector("#content").appendChild(btn); // Append <button> to <body>

      console.log(audioFeatures);

      songsArray = audioFeatures

      //let linktocsv =
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("client error didnt work");
    })
    .then(function () {
      // always executed
      console.log("client all done ");
    });
}

function test() {
  console.log("generated button worked!");
}

/*
Array(190) [ "{\"features\":{\"danceability\":0.49,\"energy\":0.648,\"key\":2,\"loudness\":-5.931,\"mode\":1,\"speechiness\":0.0335,\"acousticness\":0.448,\"instrumentalness\":0.888,\"liveness\":0.0923,\"valence\":0.429,\"tempo\":117.042,\"type\":\"audio_features\",\"id\":\"6UwyDozaC9Ndoh0Jr1jvwd\",\"uri\":\"spotify:track:6UwyDozaC9Ndoh0Jr1jvwd\",\"track_href\":\"https://api.spotify.com/v1/tracks/6UwyDozaC9Ndoh0Jr1jvwd\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/6UwyDozaC9Ndoh0Jr1jvwd\",\"duration_ms\":227240,\"time_signature\":4},\"artistInfo\":\"Ones Who Love You [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/3kzwYV3OCB010YfXMF0Avt\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/3kzwYV3OCB010YfXMF0Avt\\\",\\\"id\\\":\\\"3kzwYV3OCB010YfXMF0Avt\\\",\\\"name\\\":\\\"Alvvays\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:3kzwYV3OCB010YfXMF0Avt\\\"}]\"}", "{\"features\":{\"danceability\":0.747,\"energy\":0.572,\"key\":1,\"loudness\":-9.046,\"mode\":1,\"speechiness\":0.027,\"acousticness\":0.102,\"instrumentalness\":0.267,\"liveness\":0.331,\"valence\":0.575,\"tempo\":119.706,\"type\":\"audio_features\",\"id\":\"4VtbQx2koGlw8Ple6O2IZH\",\"uri\":\"spotify:track:4VtbQx2koGlw8Ple6O2IZH\",\"track_href\":\"https://api.spotify.com/v1/tracks/4VtbQx2koGlw8Ple6O2IZH\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/4VtbQx2koGlw8Ple6O2IZH\",\"duration_ms\":242000,\"time_signature\":4},\"artistInfo\":\"Tried And True [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/3u1ulLq00Y3bfmq9FfjsPu\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/3u1ulLq00Y3bfmq9FfjsPu\\\",\\\"id\\\":\\\"3u1ulLq00Y3bfmq9FfjsPu\\\",\\\"name\\\":\\\"Ween\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:3u1ulLq00Y3bfmq9FfjsPu\\\"}]\"}", "{\"features\":{\"danceability\":0.503,\"energy\":0.687,\"key\":9,\"loudness\":-9.427,\"mode\":0,\"speechiness\":0.0314,\"acousticness\":0.00869,\"instrumentalness\":0.0131,\"liveness\":0.131,\"valence\":0.619,\"tempo\":143.902,\"type\":\"audio_features\",\"id\":\"5KupfEBaVJwL7D2ZN0n1Q1\",\"uri\":\"spotify:track:5KupfEBaVJwL7D2ZN0n1Q1\",\"track_href\":\"https://api.spotify.com/v1/tracks/5KupfEBaVJwL7D2ZN0n1Q1\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/5KupfEBaVJwL7D2ZN0n1Q1\",\"duration_ms\":202760,\"time_signature\":4},\"artistInfo\":\"Trying Your Luck [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/0epOFNiUfyON9EYx7Tpr6V\\\",\\\"id\\\":\\\"0epOFNiUfyON9EYx7Tpr6V\\\",\\\"name\\\":\\\"The Strokes\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:0epOFNiUfyON9EYx7Tpr6V\\\"}]\"}", "{\"features\":{\"danceability\":0.747,\"energy\":0.572,\"key\":1,\"loudness\":-9.046,\"mode\":1,\"speechiness\":0.027,\"acousticness\":0.102,\"instrumentalness\":0.267,\"liveness\":0.331,\"valence\":0.575,\"tempo\":119.706,\"type\":\"audio_features\",\"id\":\"4VtbQx2koGlw8Ple6O2IZH\",\"uri\":\"spotify:track:4VtbQx2koGlw8Ple6O2IZH\",\"track_href\":\"https://api.spotify.com/v1/tracks/4VtbQx2koGlw8Ple6O2IZH\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/4VtbQx2koGlw8Ple6O2IZH\",\"duration_ms\":242000,\"time_signature\":4},\"artistInfo\":\"Tried And True [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/3u1ulLq00Y3bfmq9FfjsPu\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/3u1ulLq00Y3bfmq9FfjsPu\\\",\\\"id\\\":\\\"3u1ulLq00Y3bfmq9FfjsPu\\\",\\\"name\\\":\\\"Ween\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:3u1ulLq00Y3bfmq9FfjsPu\\\"}]\"}", "{\"features\":{\"danceability\":0.49,\"energy\":0.648,\"key\":2,\"loudness\":-5.931,\"mode\":1,\"speechiness\":0.0335,\"acousticness\":0.448,\"instrumentalness\":0.888,\"liveness\":0.0923,\"valence\":0.429,\"tempo\":117.042,\"type\":\"audio_features\",\"id\":\"6UwyDozaC9Ndoh0Jr1jvwd\",\"uri\":\"spotify:track:6UwyDozaC9Ndoh0Jr1jvwd\",\"track_href\":\"https://api.spotify.com/v1/tracks/6UwyDozaC9Ndoh0Jr1jvwd\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/6UwyDozaC9Ndoh0Jr1jvwd\",\"duration_ms\":227240,\"time_signature\":4},\"artistInfo\":\"Ones Who Love You [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/3kzwYV3OCB010YfXMF0Avt\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/3kzwYV3OCB010YfXMF0Avt\\\",\\\"id\\\":\\\"3kzwYV3OCB010YfXMF0Avt\\\",\\\"name\\\":\\\"Alvvays\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:3kzwYV3OCB010YfXMF0Avt\\\"}]\"}", "{\"features\":{\"danceability\":0.508,\"energy\":0.792,\"key\":0,\"loudness\":-7.311,\"mode\":0,\"speechiness\":0.0297,\"acousticness\":0.229,\"instrumentalness\":0.124,\"liveness\":0.145,\"valence\":0.601,\"tempo\":147.067,\"type\":\"audio_features\",\"id\":\"7H0ya83CMmgFcOhw0UB6ow\",\"uri\":\"spotify:track:7H0ya83CMmgFcOhw0UB6ow\",\"track_href\":\"https://api.spotify.com/v1/tracks/7H0ya83CMmgFcOhw0UB6ow\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/7H0ya83CMmgFcOhw0UB6ow\",\"duration_ms\":320467,\"time_signature\":4},\"artistInfo\":\"Space Song [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/56ZTgzPBDge0OvCGgMO3OY\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/56ZTgzPBDge0OvCGgMO3OY\\\",\\\"id\\\":\\\"56ZTgzPBDge0OvCGgMO3OY\\\",\\\"name\\\":\\\"Beach House\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:56ZTgzPBDge0OvCGgMO3OY\\\"}]\"}", "{\"features\":{\"danceability\":0.49,\"energy\":0.466,\"key\":1,\"loudness\":-7.685,\"mode\":1,\"speechiness\":0.0284,\"acousticness\":0.364,\"instrumentalness\":0.888,\"liveness\":0.0568,\"valence\":0.153,\"tempo\":104.882,\"type\":\"audio_features\",\"id\":\"5JyJsAZyLTD7W5oWLeB0JK\",\"uri\":\"spotify:track:5JyJsAZyLTD7W5oWLeB0JK\",\"track_href\":\"https://api.spotify.com/v1/tracks/5JyJsAZyLTD7W5oWLeB0JK\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/5JyJsAZyLTD7W5oWLeB0JK\",\"duration_ms\":368547,\"time_signature\":3},\"artistInfo\":\"PPP [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/56ZTgzPBDge0OvCGgMO3OY\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/56ZTgzPBDge0OvCGgMO3OY\\\",\\\"id\\\":\\\"56ZTgzPBDge0OvCGgMO3OY\\\",\\\"name\\\":\\\"Beach House\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:56ZTgzPBDge0OvCGgMO3OY\\\"}]\"}", "{\"features\":{\"danceability\":0.516,\"energy\":0.26,\"key\":2,\"loudness\":-10.475,\"mode\":0,\"speechiness\":0.031,\"acousticness\":0.283,\"instrumentalness\":0.834,\"liveness\":0.21,\"valence\":0.338,\"tempo\":130.684,\"type\":\"audio_features\",\"id\":\"2r3XoShDJnYhatcpfobVmC\",\"uri\":\"spotify:track:2r3XoShDJnYhatcpfobVmC\",\"track_href\":\"https://api.spotify.com/v1/tracks/2r3XoShDJnYhatcpfobVmC\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/2r3XoShDJnYhatcpfobVmC\",\"duration_ms\":286240,\"time_signature\":4},\"artistInfo\":\"Gila [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/56ZTgzPBDge0OvCGgMO3OY\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/56ZTgzPBDge0OvCGgMO3OY\\\",\\\"id\\\":\\\"56ZTgzPBDge0OvCGgMO3OY\\\",\\\"name\\\":\\\"Beach House\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:56ZTgzPBDge0OvCGgMO3OY\\\"}]\"}", "{\"features\":{\"danceability\":0.445,\"energy\":0.708,\"key\":3,\"loudness\":-6.268,\"mode\":1,\"speechiness\":0.0293,\"acousticness\":0.032,\"instrumentalness\":0.0908,\"liveness\":0.171,\"valence\":0.414,\"tempo\":141.965,\"type\":\"audio_features\",\"id\":\"2NfxtzCIrpCmJX5Z2KMdD5\",\"uri\":\"spotify:track:2NfxtzCIrpCmJX5Z2KMdD5\",\"track_href\":\"https://api.spotify.com/v1/tracks/2NfxtzCIrpCmJX5Z2KMdD5\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/2NfxtzCIrpCmJX5Z2KMdD5\",\"duration_ms\":258653,\"time_signature\":4},\"artistInfo\":\"Myth [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/56ZTgzPBDge0OvCGgMO3OY\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/56ZTgzPBDge0OvCGgMO3OY\\\",\\\"id\\\":\\\"56ZTgzPBDge0OvCGgMO3OY\\\",\\\"name\\\":\\\"Beach House\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:56ZTgzPBDge0OvCGgMO3OY\\\"}]\"}", "{\"features\":{\"danceability\":0.503,\"energy\":0.687,\"key\":9,\"loudness\":-9.427,\"mode\":0,\"speechiness\":0.0314,\"acousticness\":0.00869,\"instrumentalness\":0.0131,\"liveness\":0.131,\"valence\":0.619,\"tempo\":143.902,\"type\":\"audio_features\",\"id\":\"5KupfEBaVJwL7D2ZN0n1Q1\",\"uri\":\"spotify:track:5KupfEBaVJwL7D2ZN0n1Q1\",\"track_href\":\"https://api.spotify.com/v1/tracks/5KupfEBaVJwL7D2ZN0n1Q1\",\"analysis_url\":\"https://api.spotify.com/v1/audio-analysis/5KupfEBaVJwL7D2ZN0n1Q1\",\"duration_ms\":202760,\"time_signature\":4},\"artistInfo\":\"Trying Your Luck [{\\\"external_urls\\\":{\\\"spotify\\\":\\\"https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V\\\"},\\\"href\\\":\\\"https://api.spotify.com/v1/artists/0epOFNiUfyON9EYx7Tpr6V\\\",\\\"id\\\":\\\"0epOFNiUfyON9EYx7Tpr6V\\\",\\\"name\\\":\\\"The Strokes\\\",\\\"type\\\":\\\"artist\\\",\\\"uri\\\":\\\"spotify:artist:0epOFNiUfyON9EYx7Tpr6V\\\"}]\"}", … ] accountPage.js:42:15
*/

function makeCSV() {
  let url = "http://localhost:8080/makecsv";
  //console.log(textToGrab);
  //this will be the response from spotify

  // textToGrab = textToGrab.split("Array(")[1];
  // textToGrab = textToGrab.split(") ")[1];
  //garbage/awful (better than regex)
  
  console.log(songsArray)

  // songsArray.forEach(song => {
  //   let songSon = JSON.parse(song)
  //   console.log(songSon)
  // })

  let songsArrayString = JSON.stringify(songsArray.slice(0,10))
  console.log(songsArrayString)
  //have to limit otherwise HTTP request size is too big 


  axios
    .get(url, {
      params: {
        //songs: songsArrayString
      },
    })

    .then(function (response) {
      console.log("made csv" + response.body);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("client error didnt work");
    })
    .then(function () {
      // always executed
      console.log("client all done ");
    });
}
