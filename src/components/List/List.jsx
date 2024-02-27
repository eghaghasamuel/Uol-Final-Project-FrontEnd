import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select } from "@mui/material";
import "./style.css"
import PlaceDetails from "../PlaceDetails/PlaceDetails";


const List = ({places, childClicked, isLoading,type,setType, rating, setRating,list,setAddPlace}) => {

    const [elRefs, setElRefs] = useState([]);


    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
    // //console.log(childClicked)

    return (
        
        <div className="container">
            <Typography variant="h4">Travely</Typography>
            {isLoading ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
            <FormControl className="formControl">
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>

                </Select>
            </FormControl>
            
            <Grid container spacing={3} className="list" wrap='nowrap'>
                {places?.map((place, i)=>(
                    
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails list={list} selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} setAddPlace={setAddPlace} />
                    </Grid>
                )) }
            </Grid>
            
            </>
      )}
        </div>
    );
}

export default List;