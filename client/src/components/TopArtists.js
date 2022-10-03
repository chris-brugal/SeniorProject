import React, {useContext, useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
//import { Typography, Grid, Button } from "@mui/material";

const TopArtists = ({code}) => {
  const accessToken = useAuth(code);
  console.log(accessToken);
  
  useEffect(() => {
    if(accessToken){
      axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log('could not get top artists', err);
      });
    }
  }, [accessToken]);

  return (
    <div>TopArtists</div>
    
  );
};

export default TopArtists;
