export default async function makeSpotifySearch(endPoint, method, token) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?${endPoint}`,
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
