import React from "react";
import LandingPage from "./components/LandingPage";
import TopArtists from "./components/TopArtists";
import TopAlbums from "./components/TopAlbums";
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
        <Route path="/top-artists" exact element={<TopArtists />} />
        <Route path="/top-albums" exact element={<TopAlbums />} />
        <Route
          path="/roadtrip-generator"
          exact
          element={<RoadtripGenerator />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
