// GlobalContext.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [listItineraryMap, setListItineraryMap] = useState({});

  return (
    <GlobalContext.Provider value={{ listItineraryMap, setListItineraryMap }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
