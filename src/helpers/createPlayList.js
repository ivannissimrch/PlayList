export default async function createPlayList(token) {
  try {
    const user_id = "31ffy6shudj4zqvomp5dm4cxqioq";
    const method = "POST";
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = {
      name: "Testing creating a playlist",
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
