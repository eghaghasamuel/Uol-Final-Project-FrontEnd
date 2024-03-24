import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select } from "@mui/material";
import "./style.css"
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { useGlobalContext } from '../../GlobalContext';

const List = ({places, childClicked, isLoading,type,setType, rating, setRating,list,setAddPlace}) => {

    const [elRefs, setElRefs] = useState([]);
    const {title, setTitle} = useGlobalContext();

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
    

    return (
        
        <div className="container">
            <Typography variant="h4">{title}</Typography>
            <br />
            {isLoading ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
            <FormControl className="formControl">
                <InputLabel>Type</InputLabel>
                <br />
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>

                </Select>
            </FormControl>
            <br /> <br />
            <Grid container  className="list" wrap='nowrap'>
            <br />
                {places?.map((place, i)=>(
                    
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails list={list} selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} setAddPlace={setAddPlace} />
                    </Grid>
                )) }
                <br />
            </Grid>
            
            </>
      )}
        </div>
    );
}

export default List;