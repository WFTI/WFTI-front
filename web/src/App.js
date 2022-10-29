import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './pages/sign/signUp.jsx';

function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="signUp" element={ <Signup/> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;