export default async function getPlayList(spotifyApi) {
  const response = await spotifyApi.getUserPlaylists();
  return response.items;
}
