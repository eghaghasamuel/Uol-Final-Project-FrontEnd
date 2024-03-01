// GlobalContext.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [listItineraryMap, setListItineraryMap] = useState({});
  const [autocomplete,setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  return (
    <GlobalContext.Provider value={{ listItineraryMap, setListItineraryMap, autocomplete,setAutocomplete,coordinates, setCoordinates }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
