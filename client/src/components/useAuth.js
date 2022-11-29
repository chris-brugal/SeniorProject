import { useEffect, useState } from "react";
import axios from "axios";
import { setRef } from "@mui/material";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    if(refreshToken){
      axios
        .post("http://localhost:8000/refresh", { code })
        .then((response) => {
          // If success then cut the code string from the URL and execute the other thing
          //window.history.pushState({}, null, "/home");

          console.log(response.data);
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch(() => {
          //   If fail redirect to home page - Login page
          // window.location = "/";
        });
      } else {
        axios
        .post("http://localhost:8000/login", { code })
        .then((response) => {
          // If success then cut the code string from the URL and execute the other thing
          //window.history.pushState({}, null, "/home");

          console.log(response.data);
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch(() => {
          //   If fail redirect to home page - Login page
          // window.location = "/";
        });
      }
  }, [code]);

  return accessToken;
}
