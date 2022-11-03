import React from 'react';
import { Card, Typography, Grid } from '@mui/material';

const RoadtripGenerator = () => {
  return (
    <div>
      <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <Grid item xs={12}>
        <Typography variant="h3"></Typography>
        </Grid>
        <Grid item>
          <Card variant="outlined" sx={{ height: 500, width: 500 }}>
            <Typography variant="h3">Roadtrip Generator</Typography>
          </Card>
        </Grid>
        
      </Grid>
    </div>
    
  )
}

export default RoadtripGenerator