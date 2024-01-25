import SpotifyWebApi from "spotify-web-api-js";
import getTokenFromUrl from "../getTokenFromUrl";
const spotifyApi = new SpotifyWebApi();

export default function rootLoader() {
  const spotifyToken = getTokenFromUrl().access_token;
  window.location.hash = ";";
  if (spotifyToken) {
    //store spotify token on local storage
    localStorage.setItem("token", spotifyToken);
    spotifyApi.setAccessToken(spotifyToken);
  } else {
    spotifyApi.setAccessToken(localStorage.getItem("token"));
  }

  return spotifyApi;
}
