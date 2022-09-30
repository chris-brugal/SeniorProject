import React from "react";
import { Card, Grid, CardHeader, Typography } from "@mui/material";
import "../styles/LandingPage.css";
import { Box } from "@mui/system";

const AboutUs = () => {
  return (
    <div id="about" className="About Us">
      <Typography
        className="main-text"
        sx={{
          fontWeight: 525,
          paddingLeft: {
            xs: "0px",
            md: "30px",
          },
          paddingTop: {
            xs: "30px",
            md: "0px",
          },
        }}
        variant="h2"
      >
        About Spotify Central
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "95vh" }}
      >
        <Grid item xs={12} md={3} container justify="center">
          <Card className="card-size">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: {
                  xs: "10px",
                },
              }}
            >
              <img src="/images/graph.png" className="icon-img" alt="graph" />
            </Box>
            <CardHeader
              title={"Statistics"}
              subheader={
                "Be able to see your statics such as your top artists and albums!"
              }
              className="card-title"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={3} container justify="center">
          <Card className="card-size">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: {
                  xs: "10px",
                },
              }}
            >
              <img src="/images/trail.png" className="icon-img" alt="trail" />
            </Box>
            <CardHeader
              title={"Generate"}
              subheader={
                "Generate perfect length playlists for when you are on the road!"
              }
              className="card-title"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={3} container justify="center">
          <Card className="card-size">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: {
                  xs: "10px",
                },
              }}
            >
              <img src="/images/album.png" className="icon-img" alt="album" />
            </Box>
            <CardHeader
              title={"Personalize"}
              subheader={
                "Be able to customize and edit your playlists much more easily!"
              }
              className="card-title"
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
