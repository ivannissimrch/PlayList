import getSpotifyToken from "./getSpotifyToken";

export default async function spotifyPlayerRequest(endPoint, method) {
  try {
    const token = getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/${endPoint}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error making spotify requesr");
    throw error;
  }
}
