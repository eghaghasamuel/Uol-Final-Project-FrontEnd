// GlobalContext.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [addPlace, setAddPlace] =  useState([])
  const [listItinerary,setlistItinerary] = useState(["GIORNO"]);
  const [listItineraryMap, setListItineraryMap] = useState([() => {
    const initialItinerary = {};
      listItinerary.forEach(day => {
        initialItinerary[day] = [];
      });
    return initialItinerary;
  }]);
  const [autocomplete,setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({lat: 45.46427,lng: 9.18951});
  const [title, setTitle] = useState({});
  const [user_global, setUser_global] = useState(null);
  const [trip, setTrip] = useState([])
  const onLoad = (autoC) => setAutocomplete(autoC);

  return (
    <GlobalContext.Provider value={{
      listItineraryMap, setListItineraryMap, 
      autocomplete,setAutocomplete,
      coordinates, setCoordinates,
      addPlace, setAddPlace,
      listItinerary,setlistItinerary,
       onLoad,
       title, setTitle,
       user_global, setUser_global,
       trip, setTrip}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
