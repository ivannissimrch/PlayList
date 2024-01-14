import getSpotifyToken from "./getSpotifyToken";

export default async function getPlayList() {
  const token = getSpotifyToken();
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resData = await response.json();
    return resData.items;
  } catch (error) {
    console.error("Error making spotify requesr");
    throw error;
  }
}
