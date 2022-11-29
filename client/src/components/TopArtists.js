import React, {useEffect, useState, useRef} from "react";
import useAuth from "./useAuth.js";
import ArtistPopup from "./ArtistPopup.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Dialog, DialogTitle, Popover, Paper } from "@mui/material";

const TopArtists = ({code}) => {
  const accessToken = useAuth(code);
  
  const popOneRef = useRef();
  
  const [artistTable, setArtistTable] = useState([]);
  const [songTable, setSongTable] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [artistEl, setArtistEl] = useState(null);
  const [popSong, setPopSong] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  const handlePopoverOpen = (e, song) => {
    setPopSong(song);
    setAnchorEl(popOneRef.current);
  };

  const handleArtistOpen = (e, tile) => {
    setArtistEl(tile);
    console.log("TILE TILE TILE");
    console.log(tile);
    setDialogOpen(true);
  };

  const handleArtistClose = () => {
    setDialogOpen(false)
  };

  const open = Boolean(anchorEl);

  function msMS(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  useEffect(() => {
    if(accessToken){
      axios
      .get("http://localhost:8000/getTopArtists", {
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      })
      .then((response) => {
        console.log(response);
        setArtistTable(response.data.items);
        return axios.get("http://localhost:8000/getTopTracks", {
          'Access-Control-Allow-Origin': 'http://localhost:8000'
        })
        .then((response) => {
          console.log(response);
          setSongTable(response.data.items);
        })
      })
      .catch((err) => {
        console.log('could not get top artists', err);
      });
    }

  }, [accessToken, anchorEl]);

  return (
    <div>
        <Grid container spacing={4} sx={{pl: '2.5%', pt:'2.5%'}}>
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h5" sx={{p:0.5}}>
                  Top Songs
                </Typography>
                  {
                    songTable.slice(0,10).map( (song, index) => (
                      <Paper elevation={0}>
                        <Typography variant="body1" key={song.id}
                          aria-owns={open ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true"
                          onMouseEnter={e => handlePopoverOpen(e, song)}
                          sx = {{p:0.5}}
                        >
                          {index+1}. {song.name}
                        </Typography>
                      </Paper>
                    ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={2}>
                {artistTable.map( tile => (
                  <Grid item xs={6} sm={3} key={tile.id}>
                    <Card sx={{w:210}}>
                      <CardActionArea onClick={e => handleArtistOpen(e, tile)}>
                        <CardMedia 
                          component="img"
                          sx={{height: 253, width: 253, pr: "2%" }}
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
                    <ArtistPopup
                    artist={artistEl}
                    open={dialogOpen}
                    onClose={handleArtistClose}
                    code={code}
                    />
              </Grid>
            </Grid>
            <Grid item xs={3} ref={popOneRef}>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
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
                  disableRestoreFocus
                >
                  <Card sx={{w: 300}}>
                    <CardMedia
                      component="img"
                      sx={{height: 300, width: 300, pr: "2%"}}
                      alt="song/artist img"
                      image={popSong != null && popSong.album.images[0].url}
                    />
                    <CardContent sx={{w: 330}}>
                      <Typography variant="h4">
                        {popSong != null && popSong.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {popSong != null && popSong.artists[0].name}
                      </Typography>
                      <Typography variant="body2">
                        {popSong != null && msMS(popSong.duration_ms)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Popover>
            </Grid>
        </Grid>
    </div>
  );
};

export default TopArtists;
