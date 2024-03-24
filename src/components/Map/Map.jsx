import React from "react";
import GoogleMapReact from "google-map-react";
import { useMediaQuery } from "@mui/material";
import "./style.css"
import { useGlobalContext } from '../../GlobalContext';


const Marker = ({ text,color }) => (
    <div style={{ color: 'white', background: color, padding: '10px', borderRadius: '50%', display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
    {text}
  </div>
  );
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => { 
    const isMobile = useMediaQuery('(min-width:600px)');
    const { listItineraryMap, setListItineraryMap } = useGlobalContext();
    const markers = [];
  
    
    
    return (
        <div className="mapContainer">
            
            <GoogleMapReact
                bootstrapURLKeys = {{key:process.env.GOOGLE_MAPS_API}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                    console.log(listItineraryMap)
                }}

                onChildClick={(child) => setChildClicked(child)}
            >
        
        {Object.entries(listItineraryMap).map(([day, details]) => {
            try {
              return (
                Array.isArray(details) &&
                details.length > 0 &&
                details[0] &&
                details[1] &&
                Array.isArray(details[0]) &&
                details[0].map((detail, i) => (
                  detail && (
                    <Marker
                      key={detail.location_id}
                      lat={Number(detail.latitude)}
                      lng={Number(detail.longitude)}
                      text={i+1}
                      color={details[2]}
                    />
                  )
                ))
              );
            } catch (error) {
              console.error(details[0], error);
              return null;
            }
          })}
        {/* {Object.entries(listItineraryMap).forEach(([day, details]) => {
        try {
            console.log(details);
            console.log(details[0]);
            Array.isArray(details) &&
            details.length > 0 &&
            details[0] &&
            Array.isArray(details[0]) &&
            details[0].map((detail, i) => (
                detail && (
                <div
                    className={classes.markerContainer}
                    lat={Number(detail.latitude)}
                    lng={Number(detail.longitude)}
                    key={i}
                >
                    {!isMobile
                    ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                    : (
                        <Paper elevation={3} className={classes.paper}>
                        <Typography className={classes.typography} variant="subtitle2" gutterBottom> {detail.name}</Typography>
                        <img
                            className={classes.pointer}
                            // src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        />
                        <Rating name="read-only" size="small" value={Number(detail.rating)} readOnly />
                        </Paper>
                    )}
                    {console.log(detail.latitude)}
                </div>
                )
            ));
        } catch (error) {
            console.error(details[0], error);
        }
        })} */}


           


          

           
            </GoogleMapReact>
        </div>
    );
    
}

export default Map;