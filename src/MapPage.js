import React, {useState, useEffect} from "react";
import { CssBaseline,Grid } from "@mui/material";
import {getPlacesData} from './api'
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Itinerary_List from "./components/Itinerary_list/Itinerary_List";
import { useGlobalContext } from './GlobalContext';
import { redirect } from "react-router-dom";



const MapPage = (user) => {
    const [places, setPlaces] = useState([])
    
    const {coordinates, setCoordinates} = useGlobalContext();
    const [bounds, setBounds] =useState({});
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const { autocomplete,setAutocomplete } = useGlobalContext();
    const {onLoad} = useGlobalContext();
    
    

  
    
    useEffect (() =>{
        
        
        setIsLoading(true)
        getPlacesData(type,bounds)
            .then((data) => {
                
                setPlaces(data);
                setIsLoading(false)
            })
    }, [type,coordinates, bounds]);
    

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        
        setCoordinates({ lat, lng });
    };

    return (
        <>
            <CssBaseline/>
            <Header user={user} mappage={true}/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType = {setType}
                        rating={rating}
                        setRating={setRating}
                        list={true}
                    />
                    <Itinerary_List
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType = {setType}
                        rating={rating}
                        setRating={setRating}
                        list={false}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked = {setChildClicked}
                    />
                </Grid>
            </Grid>
   
        </>
    );
}

export default MapPage;