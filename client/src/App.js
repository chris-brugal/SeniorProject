import React from "react";
import "./App.css";
import Login from "./Login";
import LandingPage from "./LandingPage";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="app">{code ? <LandingPage code={code} /> : <Login />}</div>
  );
}

export default App;
