import React, { useState, useEffect, createRef }  from "react";
import { Autocomplete } from '@react-google-maps/api';
import useStyles from "./style"
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip  } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import { Place } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';

const Step = ({place, selected, refProp}) => {
    // console.log(place)
    // console.log(selected)
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const classes = useStyles();
    console.log(place)

    return (
        <Card elevation={6}>
            <CardMedia
            // style={{height:100}}
            // image={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
            title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h7">{place.name}</Typography>
                {place.address && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                {place.phone && (
                    <Typography variant="body2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                Delete
                </Button>
                {/* <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                Website
                </Button> */}
            </CardActions>
        </Card>
    );
}

export default Step;