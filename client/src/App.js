import React from "react";
import LandingPage from "./components/LandingPage";
import TopArtists from "./components/TopArtists";
import TopSongs from "./components/TopSongs";
import Playlists from "./components/Playlists";
import RoadtripGenerator from "./components/RoadtripGenerator";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    // Add routes here for any functional piece and then add it to the navbar
    <BrowserRouter>
      <Navbar code={code} />
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/top-artists" exact element={<TopArtists code={code} />} />
        <Route path="/top-songs" exact element={<TopSongs code={code} />} />
        <Route path="/playlists" exact element={<Playlists code={code} />} />
        <Route
          path="/roadtrip-generator"
          exact
          element={<RoadtripGenerator code={code} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
