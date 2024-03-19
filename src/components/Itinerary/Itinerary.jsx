import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid, Button} from "@mui/material";
import './style.css'
import Step from '../Step/Step'
import Selection from "../Selection/Selection";
import { useGlobalContext } from "../../GlobalContext";


const Itinerary = ({itineraryName, places, childClicked, isLoading,type,setType, rating, setRating, colors, clicked}) => {
    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    
    const [isElementVisible, setElementVisibility] = useState(false);
    const {listItineraryMap, setListItineraryMap} = useGlobalContext()
    const overrideDayArray = (Name, newArray, state) => {
      
      setListItineraryMap({
        ...listItineraryMap,
        [Name]: [newArray, state, colors],
      });
      console.log("After Override", listItineraryMap)
    };
    
  
    
    const handleToggle = () => {
      let list
      setElementVisibility(!isElementVisible);
      if(isElementVisible === true){
        try{
          list = listItineraryMap[itineraryName][0]
        }catch(err){
          list = addPlace
        }
        overrideDayArray(itineraryName,list,false)
      }else{
        try{
          list = listItineraryMap[itineraryName][0]
        }catch(err){
          list = addPlace
        }
        overrideDayArray(itineraryName,list,true)
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
      
    };
    
    useEffect(() =>{
      
      console.log(listItineraryMap)
      
      if(addPlace.length === 0){
        try{
          
            setAddPlace(listItineraryMap[itineraryName][0])
        }catch(err){
          console.log("Nope")
        }
      }else{
        overrideDayArray(itineraryName,addPlace,false)
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
            <Button onClick={handleToggle} className="toggleBtn">
            {itineraryName}
            </Button>
            <Grid container className="list_itinerary" >
                
                {isElementVisible && listItineraryMap[itineraryName][0]?.map((place, i)=>(
                    
                   
                    <Grid ref={elRefs[i]} key={i} item >
                      {console.log(place)}
                        <Step selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} deleteItem={remove}/>
                    </Grid>
                )) }
            </Grid>
            </>
      )}
      <br/><br/>
       <Selection
                places={places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType = {setType}
                rating={rating}
                setRating={setRating}
                setAddPlace={setAddPlace}
                clicked={clicked}
            />
        </div>
    );
}

export default Itinerary;