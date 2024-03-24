import React from "react";

import "./style.css"
import {  Typography, Button, Card, CardMedia, CardContent, CardActions  } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Step = ({place, selected, refProp, deleteItem,className, draggable,onDragStart,onDragEnd,onDragOver,onDrop }) => {
 
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    

    return (
        <Card elevation={3} style={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }} className={className} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDrop={onDrop}>
        <CardMedia
        style={{height:100, width:130}}
        image={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
        title={place.name}
        />
        <CardContent >
        
            <Typography gutterBottom variant="h10">{place.name}</Typography>
            
            { place.address && (
                <Typography gutterBottom variant="body2" color="textSecondary" className="subtitle">
                    <LocationOnIcon />{place.address}
                </Typography>
            )}

        </CardContent>

        <CardActions>
                <Button size="small" color="primary" onClick={() => deleteItem(place.location_id)}>
                    Delete
                </Button>

            </CardActions>
    </Card>
    );
}

export default Step;