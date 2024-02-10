import React, {useState, useEffect} from "react";
import { CssBaseline,Grid } from "@material-ui/core";
import {getPlacesData} from './api'
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";


const App = () => {
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({lat: 52.52000660, lng: 13.40495400 });
    const [bounds, setBounds] =useState({});
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    // const [event, setEvent] = useState()
    const [autocomplete,setAutocomplete] = useState(null)
    

    // useEffect(()=>{
    //     navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
    //         setCoordinates({lat: latitude, lng: longitude});
    //     })
    // }, []);

    useEffect (() =>{
        setIsLoading(true)
        getPlacesData(type,bounds)
            .then((data) => {
                console.log(data);
                setPlaces(data);
                setIsLoading(false)
            })
    }, [type,coordinates, bounds]);
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    };

    return (
        <>
            <CssBaseline/>
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
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

export default App;