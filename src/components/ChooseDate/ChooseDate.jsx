import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
import SearchIcon from '@mui/icons-material/Search';

import './style.css'
// import "react-datepicker/dist/react-datepicker.css";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

const ChooseDate = () => {


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
          zIndex: 9999, // Make sure it's above other components
        }}
      >
        
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['MultiInputDateRangeField', 'SingleInputDateRangeField']}
      >
        <MultiInputDateRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'Departure' : 'Return',
            }),
          }}
        />
        <SingleInputDateRangeField label="Departure - Return" />
      </DemoContainer>
    </LocalizationProvider> */}
      </div>
    )
  );
};

export default ChooseDate;
