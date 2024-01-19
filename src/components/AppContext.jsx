import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [songToPlay, setSongToPlay] = useState([
    "spotify:artist:6HQYnRM4OzToCYPpVBInuU",
  ]);

  function playSelectedSong(selectedSong) {
    setSongToPlay(selectedSong);
  }

  return (
    <AppContext.Provider
      value={{
        playSelectedSong,
        songToPlay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
