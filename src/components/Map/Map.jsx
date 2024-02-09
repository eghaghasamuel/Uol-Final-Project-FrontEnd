import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from "@material-ui/lab";
import useStyles from "./style"

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    
    
    return (
        <div className={classes.mapContainer}>
            
            <GoogleMapReact
                bootstrapURLKeys = {{key:'AIzaSyC2UMl2_3yjHUvqSYS7HdiWS9QLrnJAoeo'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    // console.log(e);
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}

                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.length && places?.map((place, i) => (
            <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
            >
                {!isMobile
                ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                : (
                    <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                    <img
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    />
                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                )}
            </div>
            ))}
                {/* {places?.map((place, i)=>{
                    
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        
                        {
                            
                            isMobile ? (
                                
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography  variant="subtitle2">
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer}
                                     src={place.photo ? place.photo.images.large.url : }
                                     alt={place.name} />
                                </Paper>
                            )
                        }
                    </div>
                })} */}
                
            </GoogleMapReact>
        </div>
    );
}

export default Map;