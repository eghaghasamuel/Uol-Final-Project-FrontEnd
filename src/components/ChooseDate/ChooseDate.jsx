import React, { useState } from 'react';

const ChooseDate = () => {
  const [isVisible, setIsVisible] = useState(true);

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
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <h1>This is a Full Page Modal</h1>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default ChooseDate;
