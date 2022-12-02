import React, {useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea } from "@mui/material";

const Playlists = ({code}) => {
  const accessToken = useAuth(code);
  
  const [playlistTable, setPlaylistTable] = useState([]);

  const open = Boolean(false);

  useEffect(() => {
    if(accessToken){
      axios
      .get("http://localhost:8000/getMyPlaylists", {
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      })
      .then((response) => {
        console.log(response);
        setPlaylistTable(response.data.items);
      })
      .catch((err) => {
        console.log('could not get user playlists', err);
      });
    }
  }, [accessToken]);

  return (
    <div>
          <Grid item xs={7}>
            <Grid container spacing={2}>
                {playlistTable.map( tile => (
                  <Grid item xs={6} sm={3} key={tile.id}>
                    <Card sx={{w:210}}>
                      <CardActionArea>
                        <CardMedia 
                          component="img"
                          sx={{height: 200, width: 200, pr: "2%" }}
                          alt="artist img"
                          image={tile.images[0].url}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" key={tile.id}
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                          >
                            {tile.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
    </div>
  );
};

export default Playlists;