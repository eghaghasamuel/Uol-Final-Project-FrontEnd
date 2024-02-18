import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select, InputBase, Button} from "@material-ui/core";
import { Autocomplete } from '@react-google-maps/api';
import useStyles from "./style"
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import SearchIcon from '@material-ui/icons/Search';
import Step from '../Step/Step'
import Selection from "../Selection/Selection";

const Itinerary = ({places, childClicked, isLoading,type,setType, rating, setRating,onPlaceChanged, onLoad}) => {

    const [elRefs, setElRefs] = useState([]);
    const [addPlace, setAddPlace] = useState([])
    const classes = useStyles();

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    console.log(addPlace)
    // let selectedPlaces = [];
    // selectedPlaces.push(addPlace)
    // console.log(selectedPlaces)
    return (
        <div className={classes.container}>

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
            
          
            {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
        {/* <Autocomplete onLoad={onLoad}  >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete> */}
          {/* <br></br> */}
            <Grid container spacing={3} className={classes.list} >
            
                {addPlace?.map((place, i)=>(
                    
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <Step selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                    </Grid>
                )) }
            </Grid>
            </>
      )}
        </div>
    );
}

export default Itinerary;