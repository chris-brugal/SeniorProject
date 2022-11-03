import React from 'react';
import { Card, Typography, Box, TextField, CardContent, CardActions, Button } from '@mui/material';

const RoadtripGenerator = () => {
  return (
    <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundImage: `url(${"/images/road.jpg"})`}}
        >
          <Card variant="outlined" sx={{ height: 500, width: 500 }}>
            <CardContent>
              <Typography variant="h3">Roadtrip Generator</Typography>
            </CardContent>
            <CardActions>
              <TextField id="est-trip-time" label="Estimated Trip Time" variant="outlined" />
            </CardActions>
            <CardActions>
              <TextField id="num-passengers" label="Number of passengers" variant="outlined" />
            </CardActions>
            <CardActions>
              <Button variant="contained">Submit</Button>
            </CardActions>
          </Card>
        </Box>
    </div>
    
  )
}

export default RoadtripGenerator