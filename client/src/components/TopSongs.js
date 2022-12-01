import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Dialog, DialogTitle, Popover, Paper, CardActions } from "@mui/material";

const TopSongs = ({code}) => {
  const accessToken = useAuth(code);
  
  const popOneRef = useRef();
  
  const [songTable, setSongTable] = useState([]);
  const [albumTable, setAlbumTable] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popUp, setpopUp] = useState();
  const [timeRange, setTimeRange] = useState('medium_term')
  const [popW, setPopW] = useState(300);
  const [popH, setPopH] = useState(300);
  


  const handlePopoverOpen = (e, tile) => {
    setpopUp(tile);
    console.log(popUp)
    console.log("Fetching album songs")
          return axios.post("http://localhost:8000/getAlbumTracks", {
            'Access-Control-Allow-Origin': 'http://localhost:8000',
            'heads': popUp.album.id+'/tracks?market=US&limit=5'
          })
          .then((response) => {
              console.log(response);
              setAlbumTable(response.data.items);
              setAnchorEl(popOneRef.current);
              console.log(anchorEl)
          })
  };

  const handleTime = (time) => {
    console.log("set time "+time);
    setTimeRange(time);
  }

  const open = Boolean(anchorEl);

  useLayoutEffect(() => {
    setPopW(popOneRef.current.clientWidth);
    setPopH(popOneRef.current.clientWidth);
  }, []);
  

  useEffect(() => {
    if(accessToken){

      axios
      .post("http://localhost:8000/getTopTracks", {
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'timeRange': "?time_range="+timeRange
      })
      .then((response) => {
        console.log("SONGS")
        console.log(response);
        setSongTable(response.data.items);
      })
      .catch((err) => {
        console.log('could not get top tracks', err);
      });
    }

  }, [accessToken, timeRange]);

  return (
    <div>
        <Grid container spacing={4} sx={{pl: '2.5%', pt:'2.5%'}}>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h4" sx={{p:0.5}}>
                  Time Period
                </Typography>
                  <Card sx={{my: '5%'}}>
                    <CardActionArea onClick={() => handleTime('short_term')}>
                      <Typography variant="h6" sx={{p:'5%'}}>
                        Last Month
                      </Typography>
                    </CardActionArea>
                  </Card>
                  <Card sx={{my: '5%'}}>
                    <CardActionArea onClick={() => handleTime('medium_term')}>
                      <Typography variant="h6" sx={{p:'5%'}}>
                        Six Months
                      </Typography>
                    </CardActionArea>
                  </Card>
                  <Card sx={{my: '5%'}}>
                    <CardActionArea onClick={() => handleTime('long_term')}>
                      <Typography variant="h6" sx={{p:'5%'}}>
                        All The Way Back
                      </Typography>
                    </CardActionArea>
                  </Card>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sx={{width: '60%'}} timeRange={timeRange}>
            <Grid container spacing={2}>
                {songTable.map( tile => (
                  <Grid item sx={{w:'25%'}} key={tile.id}>
                    <Card sx={{w:'100%'}}>
                      <CardActionArea 
                        aria-owns={open ? 'onClick-popover' : undefined}
                        aria-haspopup="true"
                        onClick={e => handlePopoverOpen(e, tile)}>
                        <CardMedia 
                          component="img"
                          sx={{height: 275, width: 275}}
                          alt="artist img"
                          image={tile.album.images[0].url}
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
            <Grid item sx={{width: '20%'}} ref={popOneRef}>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents:"none"
                  }}
                  anchorReference="anchorEl"
                  container={anchorEl}
                  open={open}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  
                >
                  <Card sx={{w: popW, h: popH}}>
                    <CardMedia
                      component="img"
                      sx={{w: popW, h: popH}}
                      alt="song/artist img"
                      image={popUp != null && popUp.album.images[0].url}
                    />
                    <CardContent>
                      <Typography variant="h4">
                        {popUp != null && popUp.album.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        Primary Genre: 
                      </Typography>
                      <Typography variant="body2">
                        Tracklist: 
                        {
                        albumTable.slice(0,5).map( (song, index) => (
                          <Paper elevation={0}>
                            <Typography variant="body1" key={song.id}
                              
                              sx = {{p:0.5}}
                            >
                              {index+1}. {song.name}
                            </Typography>
                          </Paper>
                        ))}
                      </Typography>
                    </CardContent>
                  </Card>
                </Popover>
            </Grid>
        </Grid>
    </div>
  );
};

export default TopSongs;
