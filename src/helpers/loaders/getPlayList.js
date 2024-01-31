export default async function getPlayList(spotifyApi) {
  try {
    const response = await spotifyApi.getUserPlaylists();
    return response.items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
