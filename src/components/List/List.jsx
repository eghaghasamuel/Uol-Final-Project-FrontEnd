import React, { useState, useEffect, createRef }  from "react";
import { CircularProgress, Grid,Typography, InputLabel,MenuItem, FormControl,Select } from "@material-ui/core";
import useStyles from "./style"
import PlaceDetails from "../PlaceDetails/PlaceDetails";


const List = ({places, childClicked, isLoading,type,setType, rating, setRating}) => {

    const [elRefs, setElRefs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
    console.log(childClicked)
    // const places =[
    //     {name:'Cool PLace'},
    //     {name:'Best Beer'},
    //     {name:'Best Stake'},
    //     {name:'Cool PLace'},
    //     {name:'Best Beer'},
    //     {name:'Best Stake'}]
    return (
        <div className={classes.container}>
            <Typography variant="h4">Food Glorious Food</Typography>
            {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>

                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>rating</InputLabel>
                <Select value={type} onChange={(e)=> setType(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                    

                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i)=>(
                    
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                    </Grid>
                )) }
            </Grid>
            </>
      )}
        </div>
    );
}

export default List;