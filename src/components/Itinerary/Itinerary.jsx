import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Button } from "@mui/material";
import './style.css'
import Step from '../Step/Step'
import Selection from "../Selection/Selection";
import { useGlobalContext } from "../../GlobalContext";
import { RiDragMove2Line } from 'react-icons/ri';


const Itinerary = ({ itineraryName, places, childClicked, isLoading, type, setType, rating, setRating, colors, clicked }) => {
  const [elRefs, setElRefs] = useState([]);
  const [addPlace, setAddPlace] = useState([])
  const [draggingItem, setDragginItem] = useState(null)
  const [isElementVisible, setElementVisibility] = useState(false);
  const { listItineraryMap, setListItineraryMap } = useGlobalContext()
  const { listItinerary, setlistItinerary } = useGlobalContext(); 
  const overrideDayArray = (Name, newArray, state) => {

    setListItineraryMap({
      ...listItineraryMap,
      [Name]: [newArray, state, colors],
    });
  };


  const handleDragStart = (e, item) => {
    setDragginItem(item)
    e.dataTransfer.setData('text/plain', '');
  };
  const handleDragEnd = () => {
    setDragginItem(null)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    const  items = listItineraryMap[itineraryName][0];
    const dragItem = draggingItem
    if (!dragItem) return;

    const currentIndex = items.indexOf(dragItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      items.splice(currentIndex, 1);
      items.splice(targetIndex, 0, dragItem);
      overrideDayArray(itineraryName, items)
    }
  };
  const handleToggle = () => {
    let list
    setElementVisibility(!isElementVisible);
    if (isElementVisible === true) {
      try {
        list = listItineraryMap[itineraryName][0]
      } catch (err) {
        list = addPlace
      }
      overrideDayArray(itineraryName, list, false)
    } else {
      try {
        list = listItineraryMap[itineraryName][0]
      } catch (err) {
        list = addPlace
      }
      overrideDayArray(itineraryName, list, true)
    }

  };

  
  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  const remove = (index) => {
    
    setAddPlace((current) =>
      current.filter(
        (place) => !(place.location_id === index)
      )
    );
    console.log(addPlace)
  };

  const removeDate = () => {
    var array = [...listItinerary]
    if (array.length == 1){
      alert("You can't leave dates Empty")
    }else{
      var index = array.indexOf(itineraryName)
      array.splice(index,1)
      setlistItinerary(array);
    }
    

  };
  useEffect(() => {

  

    if (addPlace.length === 0) {
      try {

        setAddPlace(listItineraryMap[itineraryName][0])
      } catch (err) {
        console.log("Nope")
      }
    } else {
      overrideDayArray(itineraryName, addPlace, false)
    }

  }, [addPlace])




  return (
    <div className="container">

      {isLoading ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
        <div style={{display: "flex"}}>
          <Button onClick={handleToggle} className="toggleBtn">
            {itineraryName}
          </Button>
          <Button variant="contained" color="error" onClick={removeDate}>
          Delete
        </Button>
          <Selection
        places={places}
        childClicked={childClicked}
        isLoading={isLoading}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
        setAddPlace={setAddPlace}
        clicked={clicked}
      />
          </div>
          
            
          <Grid container className="list_itinerary" >

            {isElementVisible && listItineraryMap[itineraryName][0]?.map((place, i) => (

              <Grid ref={elRefs[i]} key={i} item >
                {console.log(place)}

                <Step
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place} 
                  deleteItem={remove} 
                  className= 
                            {`item ${place === draggingItem ?  
                                'dragging' : ''
                            }`} 
                  draggable="true"
                  onDragStart={(e) =>  
                      handleDragStart(e, place)} 
                  onDragEnd={handleDragEnd} 
                  onDragOver={handleDragOver} 
                  onDrop={(e) => handleDrop(e, place)} 
                  />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      
    </div>
  );
}

export default Itinerary;