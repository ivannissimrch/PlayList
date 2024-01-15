import getSpotifyToken from "./getSpotifyToken";

export default async function deleteSongFromPayList(playlist_id, uri, method) {
  const token = getSpotifyToken();
  try {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = {
      uris: [uri],
    };

    const requestOptions = {
      method,
      headers,
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error making Spotify request:", error.message);
    throw error;
  }
}
