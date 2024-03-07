// GlobalContext.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [listItineraryMap, setListItineraryMap] = useState({});
  const [listItinerary,setlistItinerary] = useState(["GIORNO"]);
  const [autocomplete,setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const onLoad = (autoC) => setAutocomplete(autoC);

  return (
    <GlobalContext.Provider value={{ listItineraryMap, setListItineraryMap, autocomplete,setAutocomplete,coordinates, setCoordinates,listItinerary,setlistItinerary, onLoad }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
