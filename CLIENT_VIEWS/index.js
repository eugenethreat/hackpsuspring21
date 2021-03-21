//TODO: REPLACE ALL THIS WITH SERVER-SIDE JS 
function login() {
    axios.get("https://accounts.spotify.com/authorize?client_id=9cada7ab405946399f5d7fafe7cacfb0&response_type=code&redirect_uri=https://extreme-gecko-308201.ue.r.appspot.com/index.html&scope=user-read-private%20user-read-email&state=34fFs29kd09")
    .then(function (response) {
        // handle success
        alert(response)
        console.log("success!")
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
      });
}

