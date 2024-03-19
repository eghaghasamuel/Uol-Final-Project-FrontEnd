import React, { useState, useEffect, createRef }  from "react";
import "./style.css"
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, TextField  } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';
import { Place } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from "../../GlobalContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Trips = ({place, userid}) => {
    
    const {listItineraryMap, setListItineraryMap} = useGlobalContext()
    const {coordinates, setCoordinates} = useGlobalContext()
    const {listItinerary,setlistItinerary} = useGlobalContext()
    const {title, setTitle} = useGlobalContext()
    const {user_global, setUser_global} = useGlobalContext()
    const [mytrip,setMytrip] = useState(place.listTrip)
    const [visible, setVisible] =useState(false)
    const navigate = useNavigate()
    
    const visibleTitle = async () => {
      setVisible(true)
    }
    const updateTitle = async (event) =>{
        
      if (event.key === 'Enter') {try {
          console.log(user_global);
          const response = await axios.get('http://localhost:8080/trip/update-title', {
            params: {
              userId: user_global._id,
              title_new: event.target.value,
              title: place.title
            },
          });
          console.log(response)
          setVisible(false)
          window.location.reload();
          // Handle the response data
        } catch (error) {
          console.error('Error fetching trips:', error.message);
          // Handle errors, display an error message to the user, etc.
        }}
      };
    const deleteItinerary = async () =>{
        
        try {
            console.log(user_global);
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/trip/delete-trip`, {
              params: {
                userId: user_global._id,
                title: place.title
              },
            });
            window.location.reload()
            // Handle the response data
          } catch (error) {
            console.error('Error fetching trips:', error.message);
            // Handle errors, display an error message to the user, etc.
          }
        };
    const populateListRedirect = () =>{
        
        setListItineraryMap(place.listTrip)
        console.log("from tripssss", listItineraryMap)
        
        if(listItinerary[0] == "GIORNO"){
            let list = []
            let count =0
            for (const [key, value] of Object.entries(place.listTrip)) {
                list.push(key)
                if(count === 1){
                    setCoordinates({lat: value[0].latitude, lng:  value[0].longitide})
                    console.log(coordinates)
                }
              }
              setlistItinerary(list);
            }

        
        setTitle(place.title)
        navigate('/plan');
        console.log("THIS IS MAP",listItineraryMap)
        console.log("THIS IS LIST",listItinerary)
    }
    console.log(mytrip)
    return (
        <Card elevation={3} style={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <CardMedia
        style={{height:100, width:130}}
        image={'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
        title={place.title}
        />
        <CardContent >
        
            <Typography gutterBottom variant="h5">{place.title}</Typography>
{/*         
            {mytrip?.map((key,value)=>{
                <div>{value[0].name}</div>
            })

            } */}
        </CardContent>

        <CardActions>
        
        <Button size="small" color="primary" onClick={populateListRedirect}>
        Go to plan
        </Button>
        <Button size="small" color="primary" onClick={deleteItinerary}>
        DELETE
        </Button>
        {!visible ?
            <Button size="small" color="primary" onClick={visibleTitle}>UPDATE TITLE
            </Button>
            : <TextField 
            
            onKeyDown={updateTitle}
            autoFocus />
        }
        
        
            </CardActions>
    </Card>
        
    );
}

export default Trips;