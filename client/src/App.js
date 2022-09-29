import React, { useEffect } from 'react'
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useAuth from "./components/useAuth";
import SpotifyWebApi from "spotify-web-api-node";


const code = new URLSearchParams(window.location.search).get("code");

const spotifyApi = new SpotifyWebApi({
  clientId: "dd1e4b8b29004075bfe66da0d0a488f3",
});

function App() {
  // const accessToken = useAuth(code);

  // useEffect(() => {
  //   //if no access token
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  //   //gets user detail
  //   spotifyApi.getMe().then((data) => {
  //     console.log(data);
  //   });
  // }, [accessToken]);

  return (
    // <div>{code ? <LandingPage code={code} /> : <Login />}</div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
