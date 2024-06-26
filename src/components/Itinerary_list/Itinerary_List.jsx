import React, { useState, useEffect, createRef }  from "react";
import {Button } from "@mui/material";
import "./style.css"
import Itinerary from "../Itinerary/Itinerary";
import { useGlobalContext } from '../../GlobalContext';
import axios from "axios";
import dayjs from 'dayjs';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const Itinerary_List = ({places, childClicked, isLoading,type,setType, rating, setRating}) => { 
  
    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    const [isElementVisible, setElementVisibility] = useState(false);
    const [colors, setColors] = useState([])
    const {title} = useGlobalContext()
    const {user_global} = useGlobalContext()
    const [clicked, setClicked] = useState(false)
    const { listItineraryMap, setListItineraryMap } = useGlobalContext(); 
    const { listItinerary, setlistItinerary } = useGlobalContext(); 

    
    const handleToggle = () => {
        
        setElementVisibility(!isElementVisible);
    };
     
    const addDate = () => {
      
      const getDate = dayjs(listItinerary[listItinerary.length - 1 ], 'DD-MM-YYYY').add(1,"day").format('DD-MM-YYYY')

      setlistItinerary(list => [...list,getDate])
  };

    useEffect(() =>{
      for(var i=0; i<listItinerary.length;i++){
        setColors([...colors, getRandomColor()])
      }
      
    },[setListItineraryMap])

    
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
    
    const createTrip = async () => {
      //console.log(user_global)
      try {
        //console.log(title)
        // Replace 'your_server_url' with the actual URL of your server
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/trip/create-trip`, {
          title: title, // Replace with the desired title
          listTrip: listItineraryMap,
          user_l: user_global
        });
        window.open(
          `/`,
          "_self"
        );
        //console.log("Trip created successfully:", response.data);
        // You can redirect or perform other actions based on the response
      } catch (error) {
        console.error("Error creating trip:", error.message);
        // Handle errors, display an error message to the user, etc.
      }
    };
    return (
        <div className="container">

            <Button
            fullWidth
            onClick={createTrip}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SAVE ITINERARY
          </Button>
          
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
                    colors={getRandomColor()}
                    clicked={setClicked}
                    
                />
                )
                )
  
                }
            <Button
            onClick={addDate}
            variant="contained"
            style={{marginLeft:"40%", marginRight:"40%"}}
          >
            Add Date
          </Button>
        
            
        </div>
        
        
    );
}

export default Itinerary_List;
