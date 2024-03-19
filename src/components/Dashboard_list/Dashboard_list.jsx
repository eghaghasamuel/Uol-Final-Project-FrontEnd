import React, { useState, useEffect, createRef } from "react";
import "./style.css"
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';
import { Place } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from "../../GlobalContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard_List = ({ iti }) => {
    const {listItineraryMap, setListItineraryMap} = useGlobalContext()
    const {coordinates, setCoordinates} = useGlobalContext()
    const {listItinerary,setlistItinerary} = useGlobalContext()
    const {title, setTitle} = useGlobalContext()
    const {user_global, setUser_global} = useGlobalContext()
    

    const navigate = useNavigate()
    
    const populateListRedirect = () =>{
        
        setListItineraryMap(iti.listIti)
        
        if(listItinerary[0] === "GIORNO"){
            let list = []
            let count =0
            for (const [key, value] of Object.entries(iti.listIti)) {
                list.push(key)
                if(count === 1){
                    setCoordinates({lat: Number(value[0].latitude), lng:  Number(value[0].longitide)})
                    console.log("SSSSS ",coordinates)
                }
              }
              setlistItinerary(list);
            }

        
        setTitle(iti.title)
        navigate('/plan');
        console.log("THIS IS MAP",listItineraryMap)
        console.log("THIS IS LIST",listItinerary)
    }



    return (
        <Card elevation={5} style={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <CardMedia
                style={{ height: 100, width: 130 }}
                image={'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                title={iti.mail}
            />
            <CardContent >
                <Typography gutterBottom variant="h5">{iti.title}</Typography>
                <Typography gutterBottom variant="h7">{iti.mail}</Typography>
                
            </CardContent>
            <Button size="large" color="primary" onClick={populateListRedirect}>
                    Go to plan
                </Button>
            <CardActions>

                {/* <Button size="small" color="primary" onClick={populateListRedirect}>
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
         */}

            </CardActions>
        </Card>

    );
}

export default Dashboard_List;