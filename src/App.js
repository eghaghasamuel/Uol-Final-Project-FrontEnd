import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from "./MapPage";
import ChooseDate from "./components/ChooseDate/ChooseDate";

const App = () => {
  
  console.log();

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ChooseDate  />}
          />
          <Route path="/plan" element={<MapPage />} />
          <Route path="/test" element={<ChooseDate />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
