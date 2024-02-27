import React, { useState } from 'react';
import { Button } from '@mui/material';
import "./style.css"
import List from '../List/List';


const Selection = ({places, childClicked, isLoading,type,setType, rating, setRating,setAddPlace}) => {

  const [isDivVisible, setDivVisible] = useState(false);

  const handleElementClick = () => {
    setDivVisible(true);
  };

  const handleDivClose = () => {
    setDivVisible(false);
  };

  return (
    <div className={"main_div"} >
      <Button variant="contained" color="primary" onClick={handleElementClick}>
        Add place
      </Button>

      {isDivVisible && (
        <div className="overlay" onClick={handleDivClose}>
          <div className="bigDiv">
            
            <List
                places={places}
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType = {setType}
                rating={rating}
                setRating={setRating}
                list={false}
                setAddPlace={setAddPlace}
                />
    
          </div>
        </div>
      )}
    </div>
  );
};

export default Selection;
