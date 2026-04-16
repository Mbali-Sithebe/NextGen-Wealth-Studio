import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';

import Login from "./pages/Login";
import MoneySnapshot from './pages/MoneySnapshot';
import StrategyTracks from './pages/StrategyTracks';
import SimulationLab from './pages/SimulationLab';
import EducationHub from './pages/EducationHub';

import './App.css'
import './styles/Login.css'
import './styles/Navigation.css'
import './styles/MoneySnapshot.css'


export default function App(){
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </AuthProvider>
    )
}

function AppRoutes(){
    const { authStatus } = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/login"/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* MoneySnapshot is protected - only authed users can access the page */}
            <Route path='/MoneySnapshot' element={authStatus === "authed" ? 
            <MoneySnapshot/> : <Navigate to="/login"/>}/>
            {/* Redirect any unknown user to Login */}
            <Route path='*' element={<Navigate to="/login"/>}/>

            {/*Strategy Tracks*/}
            <Route path='/StrategyTracks' element={authStatus === "authed" ? 
            <StrategyTracks/> : <Navigate to="/login"/>}/>
            {/*Simulation Lab*/}
            <Route path='/SimulationLab' element={authStatus === "authed" ? 
            <SimulationLab/> : <Navigate to="/login"/>}/>
            {/*Education Hub*/}
            <Route path='/EducationHub' element={authStatus === "authed" ? 
            <EducationHub/> : <Navigate to="/login"/>}/>
        </Routes>
    )
}