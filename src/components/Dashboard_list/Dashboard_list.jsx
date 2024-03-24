import React, { useState } from "react";
import "./style.css"
import { Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useGlobalContext } from "../../GlobalContext";
import { useNavigate } from 'react-router-dom';



const Dashboard_List = ({ iti }) => {
    const {listItineraryMap, setListItineraryMap} = useGlobalContext()
    const {coordinates, setCoordinates} = useGlobalContext()
    const {listItinerary,setlistItinerary} = useGlobalContext()
    const {title, setTitle} = useGlobalContext()
    
    

    const navigate = useNavigate()
    
    const populateListRedirect = () =>{
        
        setListItineraryMap(iti.listIti)
        

        let list = []
        let count =0
        for (const [key, value] of Object.entries(iti.listIti)) {
            list.push(key)
            try{
                var coords={lat: Number(value[0][0].latitude), lng: Number(value[0][0].longitude)}
                setCoordinates(coords)
            }catch(err){
                console.log("No Coordinates")
                }
            
            }
            setlistItinerary(list);
            

        
        setTitle(iti.title)
        navigate('/plan');

    }



    return (
        <Card elevation={5} style={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginTop: "5%" }}>
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
           

            </CardActions>
        </Card>

    );
}

export default Dashboard_List;