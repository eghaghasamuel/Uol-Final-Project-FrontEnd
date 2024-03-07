import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button,TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@react-google-maps/api';
import { useGlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header/Header";
import './style.css'


const ChooseDate = () => {


  
  const { autocomplete, setAutocomplete } = useGlobalContext();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  console.log(today)
  const navigate = useNavigate();
  const {listItinerary,setlistItinerary} = useGlobalContext();
  const {coordinates, setCoordinates} = useGlobalContext();
  const [start, setStart] = useState(dayjs(today));
  const [end, setEnd] = useState(dayjs(today));
  
  
  console.log(autocomplete)
  const {onLoad} = useGlobalContext()


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
  const handleRedirect = () => {
    setlistItinerary(getDatesInRange(start, end))
    navigate('/plan');
  };

  return (
    
      
      
      <div
        style={{
          top: 0,
          left: 0,
        }}
      >
        <Header/> 
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
       onChange={(newValue) => {setStart(newValue)}}
     />
     <DatePicker
       format='DD/MM/YYYY'
       label="End Date"
       value={end}
       onChange={(newValue) => {setEnd(newValue)}}
     />
      </LocalizationProvider>
      <br />
      <Button variant="contained" color="primary" onClick={handleRedirect}>
            Go to Plan
          </Button>
          
          
        </div>
        
      </div>
    
    )

    
  
};

export default ChooseDate;
