export default async function getPlayListSongs({ playlistId }, spotifyApi) {
  try {
    const response = await spotifyApi.getPlaylistTracks(playlistId);
    return response.items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
