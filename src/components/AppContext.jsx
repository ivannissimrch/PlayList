import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({});

export function AppContextProvider({ children }) {
  const [songOnPlayer, setSongOnPlayer] = useState(
    "spotify:track:0puoT9566xTWBoRw8qDKxk"
  );

  function playSelectedSong(selectedSong) {
    setSongOnPlayer(selectedSong);
  }

  return (
    <AppContext.Provider
      value={{
        playSelectedSong,
        songOnPlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
