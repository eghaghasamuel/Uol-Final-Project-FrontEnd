import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select, Button } from "@mui/material";
import "./style.css"
import Itinerary from "../Itinerary/Itinerary";
import { useGlobalContext } from '../../GlobalContext';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const Itinerary_List = ({places, childClicked, isLoading,type,setType, rating, setRating,list,listItinerary}) => { //setlistItineraryMap

    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    const [isElementVisible, setElementVisibility] = useState(false);
    const [colors, setColors] = useState([])
    let count = 0;
    const [daysItinerary,setdaysItinerary] = useState(() => {
        const initialItinerary = {};

        listItinerary.forEach(day => {
          initialItinerary[day] = [];
        });
        return initialItinerary;
      });
    
    const handleToggle = () => {
        setElementVisibility(!isElementVisible);
    };
    const { listItineraryMap, setListItineraryMap } = useGlobalContext();
  
    setListItineraryMap(daysItinerary)

    useEffect(() =>{
      for(var i=0; i<daysItinerary.length;i++){
        setColors([...colors, getRandomColor()])
      }
    },[setdaysItinerary])

    
    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()))
    }, [places]);

    const remove = (index) => {
      setAddPlace((current) =>
        current.filter(
          (place) => !(place.location_id === index)
        )
      );
    };

    //console.log(daysItinerary)
    
    return (
        <div className="container">
            
         
                {listItinerary?.map((n) => 
                    
                    (<Itinerary
                    itineraryName={n}
                    places={places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType = {setType}
                    rating={rating}
                    setRating={setRating}
                    list={false}
                    setdaysItinerary={setdaysItinerary}
                    colors={getRandomColor()}
                    
                />
                )
                )
            
                }
                
        
            
        </div>
        
        
    );
}

export default Itinerary_List;
