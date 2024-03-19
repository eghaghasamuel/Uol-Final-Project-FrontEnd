import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import MapPage from "./MapPage";
import ChooseDate from "./components/ChooseDate/ChooseDate";
import Signin from "./components/Login/login";
import Signup from "./components/Register/register";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGlobalContext } from "./GlobalContext";


const App = () => {
  const {user_global, setUser_global} = useGlobalContext()
  const [user, setUser] = useState(null)
  const {trip, setTrip} = useGlobalContext();
  const [triplist, setTripList] = useState([])

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      
      try{
        if(data.user._json.email !== "") {
          setUser_global(data.user)
          setUser(data.user._json.email);
        }

      }catch(err){
        setUser_global(data.user)
        setUser(data.user.email);
      }
		} catch (err) {
			console.log(err);
		}
	};
  
	useEffect(() => {
		getUser();

	}, []);
   useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trip/get-trips`, {
          params: {
            userId: user_global._id,

          },
        });
        if(response.data.error === false){
          setTrip(response.data.trip_list)
        }else{
          setTrip([])
          
        }
        
      } catch (error) {
        console.error('Error fetching trips:', error.message);
      }
    };
  
    fetchData();
   }, [user_global])

  return (
    <div>
      <Router>
        <Routes>
  
          <Route path="/plan" element={user ? <MapPage user={user}/> : <Navigate to="/login"/>} />
          <Route path="/login" element={user ? <Navigate to="/"/> :<Signin/> } />
          <Route path="/register" element={user ? <Navigate to="/"/> : <Signup />} />
          <Route path="/" element={user ? <ChooseDate user={user} userid={user_global._id}/> : <ChooseDate user=""/> } />
          <Route path="/Dashboard" element={user ? <Dashboard user={user}/> : <Dashboard user=""/> }/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
