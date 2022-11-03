import React, { useState } from 'react';
import { Card, Typography, Box, TextField, CardContent, CardActions, Button, Autocomplete } from '@mui/material';

const RoadtripGenerator = () => {
  const options = ['Pop', 'Hip Hop', 'Jazz', 'Dance', 'Country', 'Disco', 'Musical Theatre', 'Latin', 'Kpop'];
  let [landingScreen, setlandingScreen] = React.useState(true);
  let [finalScreen, setfinalScreen] = React.useState(false);
  let [estimatedTripTime, setestimatedTripTime] = React.useState("");
  let [numPassengers, setenumPassengers] = React.useState("");
  let [passenger1, setpassenger1] = React.useState("");
  let [passenger2, setpassenger2] = React.useState("");
  let [passenger3, setpassenger3] = React.useState("");
  return (
    <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundImage: `url(${"/images/road.jpg"})`}}
        >
          {landingScreen ? 
            (
              <Card variant="outlined" sx={{ height: 500, width: 500 }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                </CardContent>
                <CardActions>
                  <TextField 
                  id="est-trip-time" 
                  value={estimatedTripTime} 
                  onChange={(i) => {setestimatedTripTime(i.target.value)}}
                  label="Estimated Trip Time" 
                  variant="outlined" 
                />
                </CardActions>
                <CardActions>
                  <TextField 
                  id="num-passengers" 
                  value={numPassengers} 
                  onChange={(i) => {setenumPassengers(i.target.value)}}
                  label="Number of passengers" 
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
              <Card variant="outlined" sx={{ height: 500, width: 500 }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                  <Typography variant="h5">Your estimated trip time is { estimatedTripTime }.</Typography>
                  <Typography variant="h5">You have { numPassengers } passengers.</Typography>
                  <Typography variant="h5">Passenger 1's genre is: { passenger1 }</Typography>
                  <Typography variant="h5">Passenger 2's genre is: { passenger2 }</Typography>
                  <Typography variant="h5">Passenger 3's genre is: { passenger3 }</Typography>
                </CardContent>
              </Card>
            ) :
            (
              <Card variant="outlined" sx={{ height: 500, width: 500 }}>
                <CardContent>
                  <Typography variant="h3">Roadtrip Generator</Typography>
                </CardContent>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger1-genre"
                    onChange={(i, newValue) => {setpassenger1(newValue)}}
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 1" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger2-genre"
                    onChange={(i, newValue) => {setpassenger2(newValue)}}
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 2" />}
                  />
                </CardActions>
                <CardActions>
                  <Autocomplete
                    disablePortal
                    id="passenger3-genre"
                    onChange={(i, newValue) => {setpassenger3(newValue)}}
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Passenger 3" />}
                  />
                </CardActions>
                <CardActions>
                  <Button variant="contained" onClick={() => setfinalScreen(!finalScreen)}>Submit</Button>
                </CardActions>
              </Card>
            ) 
          }
          </Box> 
    </div>
    
  )
}


export default RoadtripGenerator