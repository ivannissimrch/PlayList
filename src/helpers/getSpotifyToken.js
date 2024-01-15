//get spotify token from local storage

export default function getSpotifyToken() {
  const token = localStorage.getItem("token");
  return token;
}
