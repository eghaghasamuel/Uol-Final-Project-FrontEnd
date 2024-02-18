import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import useStyles from "./style"
import List from '../List/List';


const Selection = ({places, childClicked, isLoading,type,setType, rating, setRating,setAddPlace}) => {
  const classes = useStyles();
  const [isDivVisible, setDivVisible] = useState(false);

  const handleElementClick = () => {
    setDivVisible(true);
  };

  const handleDivClose = () => {
    setDivVisible(false);
  };

  return (
    <div className={classes.main_div} >
      <Button variant="contained" color="primary" onClick={handleElementClick}>
        Add place
      </Button>

      {isDivVisible && (
        <div className={classes.overlay} onClick={handleDivClose}>
          <div className={classes.bigDiv}>
            
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
