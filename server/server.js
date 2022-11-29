const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");
const { response } = require("express");

const app = express();
const port = 8000;

app.use(cors({origin:"*", credentials:true}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const credentials = {
  clientId: "dd1e4b8b29004075bfe66da0d0a488f3",
  clientSecret: "188c7f73948d45199a117f243e10216e",
  redirectUri: "http://localhost:3000/",
};

var spotifyApi = new spotifyWebApi(credentials);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
      console.log('the access token is ' + data.body.access_token);

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

  axios
  .get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
      }
    })
    .then((response) => res.json(response.data))
    .catch((err) => {
      console.log('could not get top artists', err);
      res.sendStatus(400);
    });
});

app.get("/getTopTracks", (req, res) => {

  axios
  .get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
      }
    })
    .then((response) => res.json(response.data))
    .catch((err) => {
      console.log('could not get top tracks', err);
      res.sendStatus(400);
    });
});

app.get("/getArtistTopTracks", (req, res) => {

  spotifyApi.getArtistTopTracks(req.id, 'US')
  .then((response) => res.json(response.data))
  .catch((err) => {
    console.log('could not get Artist top tracks', err);
    res.sendStatus(400);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
