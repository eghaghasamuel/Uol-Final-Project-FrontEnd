import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete } from '@react-google-maps/api';
import { useGlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import Trips from '../Trips/Trips';
import Box from "@mui/material/Box";
import Header from "../../components/Header/Header";
import Dashboard_List from '../Dashboard_list/Dashboard_list';
import axios from 'axios';



const Dashboard = (user) => {


    const [listTrips, setListTrips] = useState([])

    
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/trip/get-all-trips`);

                setListTrips(response.data.data)
                
                // Handle the response data
            } catch (error) {
                console.error('Error fetching trips:', error.message);
                // Handle errors, display an error message to the user, etc.
            }
        };

        fetchData();
    }, [listTrips])


    return (



        <div
            style={{
                top: 0,
                left: 0,
            }}
        >
            <Header user={""} />
            {listTrips?.map((i) => (
                <Dashboard_List iti={i}  />
            ))}

        </div>


    )



};

export default Dashboard;
