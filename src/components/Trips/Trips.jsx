import React, { useState }  from "react";
import "./style.css"
import { Typography, Button, Card, CardMedia, CardContent, CardActions, TextField  } from "@mui/material";
import { useGlobalContext } from "../../GlobalContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Trips = ({place, userid}) => {
    
    const {listItineraryMap, setListItineraryMap} = useGlobalContext()
    const {coordinates, setCoordinates} = useGlobalContext()
    const {listItinerary,setlistItinerary} = useGlobalContext()
    const {setTitle} = useGlobalContext()
    const {user_global} = useGlobalContext()
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
          
          setVisible(false)
          window.location.reload();
        } catch (error) {
          console.error('Error fetching trips:', error.message);
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
          } catch (error) {
            console.error('Error fetching trips:', error.message);
          }
        };
    const populateListRedirect = () =>{
        
        setListItineraryMap(place.listTrip)
        
        
        
        let list = []
        let count =0
        for (const [key, value] of Object.entries(place.listTrip)) {
          count = count+1
            list.push(key)
            if(count == 1){
              try{
                setCoordinates({lat: Number(value[0][0].latitude), lng: Number(value[0][0].longitude)})
              }catch(err){
                console.log("No Coordinates")
              }
              
            }
            
            
          }
          setlistItinerary(list);
            

        
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
        image={'https://img.freepik.com/free-vector/flying-aircraft-icon-isolated-vector_24911-114304.jpg'} 
        title={place.title}
        />
        <CardContent >
        
            <Typography gutterBottom variant="h5">{place.title}</Typography>

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