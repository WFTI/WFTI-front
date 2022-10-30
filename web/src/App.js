import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './pages/sign/SignUp.jsx';
import Search from './pages/search/SearchMain.jsx';

function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="signUp" element={ <Signup/> }/>
                <Route path="search" element={ <Search/> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;