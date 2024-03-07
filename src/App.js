import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import MapPage from "./MapPage";
import ChooseDate from "./components/ChooseDate/ChooseDate";
import Signin from "./components/Login/login";
import Signup from "./components/Register/register";


const App = () => {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};
  
	useEffect(() => {
		getUser();
	}, []);
  

  return (
    <div>
      <Router>
        <Routes>
  
          <Route path="/plan" element={user ? <MapPage user={user}/> : <Navigate to="/login"/>} />
          <Route path="/login" element={user ? <Navigate to="/"/> :<Signin/> } />
          <Route path="/register" element={user ? <Navigate to="/"/> : <Signup />} />
          <Route path="/" element={user ? <ChooseDate user={user}/> : <ChooseDate user=""/> } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
