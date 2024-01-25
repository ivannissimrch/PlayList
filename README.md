# Playlist App

The app allows you to create and store playlists on your Spotify account.
Also, it provides a built-in music player to play the music right within the app.

How it Works:
The app links to your Spotify account, enabling you to access your music library and playlist data.
The app uses two libraries for interaction:
react-spotify-web-playback: This library gives you a music player component, allowing you to play, pause, skip, and control songs within the app.
spotify-web-api: JS wrapper for the Spotify Web API This library includes helper functions for all Spotify's endpoints, enabling actions like creating playlists, adding/removing songs, and fetching playlist information.

The app manages the current song on the music player using React Context and shares this information across different components on the app, ensuring everything stays in sync. Also,
A Loader on Root is used to create an instance of the SpotifyAPI from the spotify-web-api, which is then accessible to child components of the app. This allows the components to use methods from the spotify-web-api library to make fetch requests to the Spotify API.

Documentation for the spotify-web-api library: https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.addtrackstoplaylist

react-spotify-web-playback:
https://www.npmjs.com/package/@chrisuh10/react-spotify-web-playback
