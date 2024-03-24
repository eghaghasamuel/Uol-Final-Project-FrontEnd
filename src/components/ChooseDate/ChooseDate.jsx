import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@react-google-maps/api';
import { useGlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Trips from '../Trips/Trips';
import Box from "@mui/material/Box";
import Header from "../../components/Header/Header";
import './style.css';


const ChooseDate = (user, userid) => {



  const { autocomplete, setAutocomplete } = useGlobalContext();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;

  const navigate = useNavigate();
  const { trip, setTrip } = useGlobalContext();
  const { listItinerary, setlistItinerary } = useGlobalContext();
  const { coordinates, setCoordinates } = useGlobalContext();
  const { title, setTitle } = useGlobalContext();
  const [start, setStart] = useState(dayjs(today));
  const [end, setEnd] = useState(dayjs(today));

  const { onLoad } = useGlobalContext()

  const handleSubmit = async (event) => {
    
    if(!start.isValid() || !end.isValid()){
      navigate('/')
      alert("Write the start date and end date")
    }else{
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setTitle(formData.get("title"))
      setlistItinerary(getDatesInRange(start, end))
      navigate('/plan');
  
    }
   
  }
  const getDatesInRange = (start, end) => {
    const range = [];
    let currentDate = start;

    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      range.push(currentDate.format('DD-MM-YYYY'));
      currentDate = currentDate.add(1, 'day');
    }

    return range;
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <div
      style={{
        top: 0,
        left: 0,
      }}
    >
      <Header user={user} mappage={false} />
      <Box component="form" onSubmit={(handleSubmit)} noValidate sx={{ mt: 1 }} style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>

          <div className="title">
            <Typography variant="h5">Title</Typography>
            <TextField name='title' placeholder="Enter Title" required />
          </div>
          <br /><br />
          <Typography variant="h5">Destination</Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} required>
            <div className="title">
              <TextField placeholder="Enter Destination" />
            </div>
          </Autocomplete>
          <br /><br />

          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker
              format='DD/MM/YYYY'
              label="Start Date"
              value={start}
              onChange={(newValue) => { setStart(newValue) }}
            />
            <DatePicker
              format='DD/MM/YYYY'
              label="End Date"
              value={end}
              onChange={(newValue) => { setEnd(newValue) }}
            />
          </LocalizationProvider>
          <br /> <br />
          <Button type="submit" variant="contained" color="primary">
            Go to Plan
          </Button>


        </div>
        {trip?.map((i) => (
          <Trips place={i} userid={userid} />
        ))}
      </Box>


    </div>


  )



};

export default ChooseDate;
