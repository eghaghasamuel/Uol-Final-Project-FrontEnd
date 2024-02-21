import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select, Button } from "@material-ui/core";
import useStyles from "./style"
import Itinerary from "../Itinerary/Itinerary";


const Itinerary_List = ({places, childClicked, isLoading,type,setType, rating, setRating,list,listItinerary,setlisitItineraryMap}) => {

    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    const [isElementVisible, setElementVisibility] = useState(false);
    const [ItineraryList,setItineraryList] = useState([])
    
    const handleToggle = () => {
        setElementVisibility(!isElementVisible);
    };
    const classes = useStyles();
    

    const [test,setTest] = useState([])
    useEffect(()=>{
        setTest([...test,ItineraryList])
    }, listItinerary)

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

    console.log(ItineraryList)
    // let selectedPlaces = [];
    // selectedPlaces.push(addPlace)
    // console.log(selectedPlaces)
    return (
        <div className={classes.container}>
            
         
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
                    setItineraryList={setItineraryList}
                    
                />))
            
                }
                
        
            
        </div>
        
        
    );
}

export default Itinerary_List;

      {/* <Grid container spacing={3} className={classes.list} >
            
                {addPlace?.map((place, i)=>(
                    
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <Step selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} deleteItem={remove}/>
                    </Grid>
                )) }
            </Grid> */}