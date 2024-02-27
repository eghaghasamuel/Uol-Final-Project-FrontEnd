import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button,TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@react-google-maps/api';
import './style.css'


const ChooseDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;
console.log(today)
  const [start, setStart] = React.useState(dayjs(today));
  const [end, setEnd] = React.useState(dayjs(today));
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null)
  const [startDate, setStartDate] = useState(new Date());
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    
    isVisible && (
      
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
        <Autocomplete >
            <div className="title">
          
              <TextField placeholder="Enter Destination" />
            </div>
          </Autocomplete>
          <br /><br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
     
     <DatePicker
       label="Start Date"
       value={start}
       onChange={(newValue) => {if (newValue < end){setStart(newValue)}else{setIsVisible(false)}}}
     />
     <DatePicker
       label="End Date"
       value={end}
       onChange={(newValue) => {if (newValue > start){setEnd(newValue)}else{setIsVisible(false)}}}
     />
   
      
    </LocalizationProvider>
          
          <Button onClick={handleClose}>Close</Button>
        </div>
        
      </div>
      
    )

    
  );
};

export default ChooseDate;
