import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import MapPage from "./MapPage";
import ChooseDate from "./components/ChooseDate/ChooseDate";



const App = () => {
   
    return (
        <div>
            <BrowserRouter>
            
                <Routes>
                    <Route index element={<MapPage/>}/>
                    <Route path="/plan" element={<MapPage/>}/>
                    <Route path="/test" element={<ChooseDate/>}/>
                   
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;