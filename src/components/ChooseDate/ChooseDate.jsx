import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button,TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@react-google-maps/api';
import { useGlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
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
  const {coordinates, setCoordinates} = useGlobalContext();
  const [start, setStart] = useState(dayjs(today));
  const [end, setEnd] = useState(dayjs(today));
  
  
  console.log(autocomplete)
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    
    setCoordinates({ lat, lng });
};
  const handleRedirect = () => {
    navigate('/plan');
  };

  return (
    
   
      
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '0', // Make sure it's above other components
        }}
      >
        
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="title">
          
              <TextField placeholder="Enter Destination" />
            </div>
          </Autocomplete>
          <br /><br />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
     <DatePicker
       label="Start Date"
       value={start}
       onChange={(newValue) => {if (newValue < end){setStart(newValue)}}}
     />
     <DatePicker
       label="End Date"
       value={end}
       onChange={(newValue) => {if (newValue > start){setEnd(newValue)}}}
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
