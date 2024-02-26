import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select, InputBase, Button} from "@material-ui/core";
import { Autocomplete } from '@react-google-maps/api';
import useStyles from "./style"
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import SearchIcon from '@material-ui/icons/Search';
import Step from '../Step/Step'
import Selection from "../Selection/Selection";


const Itinerary = ({itineraryName, places, childClicked, isLoading,type,setType, rating, setRating,onPlaceChanged, onLoad,selectedPlaces,setdaysItinerary, colors}) => {

    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    
    const [isElementVisible, setElementVisibility] = useState(false);
    
    const overrideDayArray = (Name, newArray,state) => {
      setdaysItinerary(prevItinerary => ({
        ...prevItinerary,
        [Name]: [newArray,state,colors]
      }));
    };
    
    const handleToggle = () => {
      setElementVisibility(!isElementVisible);
      if(isElementVisible == true){
        overrideDayArray(itineraryName,addPlace,false)
      }else{
        overrideDayArray(itineraryName,addPlace,true)
      }
      
    };
    const classes = useStyles();

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

      overrideDayArray(itineraryName,addPlace,false)
    }, [addPlace])




    return (
        <div className={classes.container}>
           
            {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
            <Button onClick={handleToggle} className={classes.toggleBtn}>
            {itineraryName}
            </Button>
            <Grid container className={classes.list} >
                
                {isElementVisible && addPlace?.map((place, i)=>(
                    
                   
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
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
            />
        </div>
    );
}

export default Itinerary;