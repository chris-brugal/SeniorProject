import React, {useContext} from "react";
import { loginUrl } from "./spotify";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const pages = new Map([
  ["top-artists", "Top Artists"],
  ["playlists", "Playlists"],
  ["roadtrip-generator", "Roadtrip Generator"],
]);

const Navbar = ({ code }) => {
  let menu;
  if (!code) {
    menu = (
      <a href={loginUrl} style={{ textDecoration: "none", color: "white" }}>
        <Button color="inherit">Login</Button>
      </a>
    );
  } else {
    menu = (
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex" },
          justifyContent: "flex-end",
        }}
      >
        {Array.from(pages.entries()).map(([key, value]) => (
          <Link
            key={key}
            to={"/" + key}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              {value}
            </Button>
          </Link>
        ))}
      </Box>
    );
  }

  return (
    <Box id="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Spotify Central
            </Link>
          </Typography>
          {menu}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
