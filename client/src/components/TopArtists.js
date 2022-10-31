import React, {useContext, useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, CardActions, Button } from "@mui/material";

const TopArtists = ({code}) => {
  const accessToken = useAuth(code);
  
  const [artistTable, setArtistTable] = useState([]);
  const [songTable, setSongTable] = useState([]);

  useEffect(() => {
    if(accessToken){
      axios
      .get("http://localhost:8000/getTopArtists", {
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      })
      .then((response) => {
        console.log(response);
        setArtistTable(response.data.items);
      })
      .catch((err) => {
        console.log('could not get top artists', err);
      });
    }
  }, [accessToken]);

  return (
    <div>
      <Typography variant="h3" component="div">
        YEEERSHL:JSLER
      </Typography>
        <Grid container spacing={5}>
          <Grid item>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>

              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
                {artistTable.map( tile => (
                  <Grid item xs={6} sm={3} key={tile.id}>
                    <Card sx={{ maxWidth: 245 }}>
                      <CardActionArea>
                        <CardMedia 
                          component="img"
                          style={{height: 245, padding: "2%" }}
                          alt="artist img"
                          image={tile.images[0].url}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {tile.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
        </Grid>
    </div>
  );
};

export default TopArtists;
