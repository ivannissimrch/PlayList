export default async function getPlayListSongs(token, { playlistId }) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resData = await response.json();
    return resData.tracks.items;
  } catch (error) {
    console.error("Error making spotify requesr");
    throw error;
  }
}
