const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const axios = require("axios")

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const credentials = {
  clientId: "dd1e4b8b29004075bfe66da0d0a488f3",
  clientSecret: "188c7f73948d45199a117f243e10216e",
  redirectUri: "http://localhost:3000/",
};

var spotifyApi = new spotifyWebApi(credentials);

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.post("/login", (req, res) => {

  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
  const code = req.body.code;

  // Retrieve an access token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // Settign the access and refresh tokens for later use
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);

      // Returning the User's AccessToken in the json formate
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token
      });
    })
    .catch((err) => {
      console.log('could not retrieve access token',err);
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {

  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
  const code = req.body.code;

  // Retrieve an access token
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      // Returning the User's AccessToken in the json formate
      res.json({
        accessToken: data.body.accessToken,
        refreshToken: data.body.refresh_token
      });
    })
    .catch((err) => {
      console.log('could not refresh access token', err);
      res.sendStatus(400);
    });
});

app.get("/getTopArtists", (req, res) => {

  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api

  // Retrieve an access token
  axios
  .get("https://api.spotify.com/v1/me/top/type", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
      }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log('could not get top artists', err);
      res.sendStatus(400);
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
