import React, { useEffect, useState } from 'react';
import useAuth from "./useAuth.js";
import axios from "axios";
import { Card, Typography, Box, TextField, CardContent, CardActions, Button, Autocomplete,Paper,Link } from '@mui/material';

const RoadtripGenerator = ({code}) => {
  const accessToken = useAuth(code);
  let [landingScreen, setlandingScreen] = React.useState(true);
  let [finalScreen, setfinalScreen] = React.useState(false);
  let [estimatedTripTime, setestimatedTripTime] = React.useState("");
  let [numPassengers, setenumPassengers] = React.useState(0);
  let [passenger1, setpassenger1] = React.useState("");
  let [passenger2, setpassenger2] = React.useState("");
  let [passenger3, setpassenger3] = React.useState("");
  let [passenger4, setpassenger4] = React.useState("");
  let [passenger5, setpassenger5] = React.useState("");
  let [genres, setGenres] = useState([]);
  let [recommendations, setRecommendations] = useState([]);
  let [numSongsInPlaylist, setNumSongsInPlaylist] = React.useState(0);
  let playlistDuration = 0;

  useEffect(() => {
    if(accessToken){
      axios
      .get("http://localhost:8000/getGenres", {
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      })
      .then((response) => {
        console.log(response.data.genres);
        setGenres(response.data.genres);
      })
      .catch((err) => {
        console.log('could not get genres', err);
      });
    }
  }, [accessToken]);

  const getRecommendations = () => {
    return axios.post("http://localhost:8000/getRecommendationsByGenre", {
            'Access-Control-Allow-Origin': 'http://localhost:8000',
            'heads': "limit="+numSongsInPlaylist+"&market=US&seed_genres="+passenger1+","+passenger2+","+passenger3+","+passenger4+","+passenger5
          })
          .then((response) => {
              console.log('response', response);
              setRecommendations(response.data.tracks);
              console.log('recommendations', recommendations);
          })
          .catch((err) => {
            console.log('could not get recommendations', err);
          });
  };

  function msMS(millis) {
    var seconds = Math.floor((millis / 1000) % 60);
    var minutes = Math.floor((millis / (1000 * 60)) % 60);
    var hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  return (
    <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{backgroundImage: `url(${"/images/road.jpg"})`,}}
        >
          {landingScreen ? 
            (
              <Card variant="outlined" sx={{ height: 500, width: 500 }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                </CardContent>
                {/* <CardActions>
                  <TextField 
                  id="est-trip-time" 
                  value={estimatedTripTime} 
                  onChange={(i) => {setestimatedTripTime(i.target.value)}}
                  label="Estimated Trip Time" 
                  variant="outlined" 
                />
                </CardActions> */}
                {/* <CardActions>
                  <TextField 
                  type="number"
                  id="num-passengers" 
                  value={numPassengers} 
                  onChange={(i) => {setenumPassengers(i.target.value)}}
                  label="Number of passengers [1-4]" 
                  variant="outlined" 
                />
                </CardActions> */}
                <CardActions>
                  <TextField 
                  type="number"
                  id="num-songs-in-playlist" 
                  value={numSongsInPlaylist} 
                  onChange={(i) => {setNumSongsInPlaylist(i.target.value)}}
                  label="Number of Songs in Playlist [0-30]" 
                  variant="outlined" 
                />
                </CardActions>
                <CardActions>
                  <Button variant="contained" onClick={() => setlandingScreen(!landingScreen)}>Submit</Button>
                </CardActions>
              </Card>
            ) :
            finalScreen ? 
            (
              <Card variant="outlined" sx={{ height: 500, width: 500, overflowY: "scroll" }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                  {Array.from(recommendations).forEach((i) => playlistDuration += parseInt(i.duration_ms))} 
                  <Typography variant="h5">The playlist duration is { msMS(playlistDuration) }.</Typography>
                  <Typography variant="h5">Passenger 1's genre is: { passenger1 }</Typography>
                  <Typography variant="h5">Passenger 2's genre is: { passenger2 }</Typography>
                  <Typography variant="h5">Passenger 3's genre is: { passenger3 }</Typography>
                  <Typography variant="h5">Passenger 4's genre is: { passenger4 }</Typography>
                  <Typography variant="h5">Passenger 5's genre is: { passenger5 }</Typography>
                  <Typography variant="h5">
                        Tracklist: 
                        {
                        recommendations.slice(0,30).map( (song, index) => (
                          <Paper elevation={0}>
                            <Link href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <Typography variant="body1" 
                              
                              sx = {{p:0.5}}
                            >
                              {index+1}. {song.name} - {song.artists[0].name} - {msMS(song.duration_ms)}
                            </Typography>
                            </Link>
                          </Paper>
                        ))}
                      </Typography>
                </CardContent>
              </Card>
            ) :
            (
                <Card variant="outlined" sx={{ height: 500, width: 500, overflowY: "scroll" }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                  <Typography variant="h6">Please enter in each passenger's preferred song genre.</Typography>
                </CardContent>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger1-genre"
                    onChange={(i, newValue) => {setpassenger1(newValue)}}
                    options={genres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 1" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger2-genre"
                    onChange={(i, newValue) => {setpassenger2(newValue)}}
                    options={genres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 2" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger3-genre"
                    onChange={(i, newValue) => {setpassenger3(newValue)}}
                    options={genres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 3" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger4-genre"
                    onChange={(i, newValue) => {setpassenger4(newValue)}}
                    options={genres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 4" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger5-genre"
                    onChange={(i, newValue) => {setpassenger5(newValue)}}
                    options={genres}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 5" />}
                  />
                </CardActions>
                <CardActions>
                  <Button variant="contained" onClick={() => {
                    setfinalScreen(!finalScreen);
                    getRecommendations();
                  }}>Submit</Button>
                </CardActions>
              </Card>
            )
          }
          </Box> 
    </div>
    
  )
}


export default RoadtripGenerator