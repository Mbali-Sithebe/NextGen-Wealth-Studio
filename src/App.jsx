import { useState } from 'react'
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import './App.css'

// Include Components That Will Be Created Also
// IMPORT ALL OTHER PAGES THAT YOU WILL CREATE ABOVE: (Money snapshot, Strategy Tracks, Simulation lab and Education hub)


export default function App(){
    //Routing Pages Here:
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/' element={<Dashboard/>}></Route>
        </Routes>
        </BrowserRouter>
    )

}

