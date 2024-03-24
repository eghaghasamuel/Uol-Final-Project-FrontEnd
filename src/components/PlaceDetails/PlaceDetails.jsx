import React from "react";
import { Typography, Button, Card, CardMedia, CardContent, CardActions  } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import "./style.css"


const PlaceDetails = ({place, selected, refProp, list,setAddPlace}) => {

    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   


    return (

        <Card elevation={1} style={{ display: 'flex', alignItems: 'center', width: "100%", height: "100%"}}>
        <CardMedia
        style={{height:100, width:130}}
        image={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
        title={place.name}
        />
        <CardContent >
        
            <Typography  variant="h10">{place.name}</Typography>
            
            { place.address && (
                <Typography variant="body2" color="textSecondary" className="subtitle">
                    <LocationOnIcon />{place.address}
                </Typography>
            )}

        </CardContent>

        <CardActions>
            {list && (
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                Trip Advisor
                </Button>)}
            {!list && (
                <Button size="small" color="primary" onClick={() => setAddPlace(p => [...p, place ])}>
                    ADD PLACE
                </Button>
            )}
                {list && (
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button> 
                )}
        </CardActions>
    </Card>
    );
}

export default PlaceDetails;