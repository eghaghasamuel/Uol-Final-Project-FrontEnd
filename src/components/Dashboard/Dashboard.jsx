import { Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Dashboard_List from '../Dashboard_list/Dashboard_list';



const Dashboard = (user) => {


    const [listTrips, setListTrips] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/trip/get-all-trips`);
                setListTrips(response.data.data)
            } catch (error) {
                console.error('Error fetching trips:', error.message);

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

            <Header user={user} />
            <br />
            <Typography textAlign={"center"} variant="h3">Planned Trips</Typography>
            <div style={{
                top: 0,
                left: 0,
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                {listTrips?.map((i) => (
                    <Dashboard_List iti={i} />
                ))}
            </div>


        </div>


    )



};

export default Dashboard;
