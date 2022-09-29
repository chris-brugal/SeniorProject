import React, { useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "dd1e4b8b29004075bfe66da0d0a488f3",
});

const LandingPage = ({ code }) => {
  const accessToken = useAuth(code);

  useEffect(() => {
    //if no access token
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    //gets user detail
    spotifyApi.getMe().then((data) => {
      console.log(data);
    });
  }, [accessToken]);

  return <div>{code}</div>;
};

export default LandingPage;
