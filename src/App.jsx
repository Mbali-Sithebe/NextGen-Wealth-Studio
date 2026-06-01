import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import './styles/StrategyTracks.css'
import './styles/SimulationLab.css'
import './styles/EducationHub.css'


export default function App(){
    return (
        <AuthProvider>
            <HashRouter>
                <AppRoutes/>
            </HashRouter>
        </AuthProvider>
    )
}

function AppRoutes(){
    const { authStatus } = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/login"/>}/>
            <Route path='/login' element={<Login/>}/>
    
            <Route path='/MoneySnapshot' element={authStatus === "authed" ? 
            <MoneySnapshot/> : <Navigate to="/login"/>}/>
         
            <Route path='*' element={<Navigate to="/login"/>}/>
        
            <Route path='/StrategyTracks' element={authStatus === "authed" ? 
            <StrategyTracks/> : <Navigate to="/login"/>}/>
          
            <Route path='/SimulationLab' element={authStatus === "authed" ? 
            <SimulationLab/> : <Navigate to="/login"/>}/>
        
            <Route path='/EducationHub' element={authStatus === "authed" ? 
            <EducationHub/> : <Navigate to="/login"/>}/>
        </Routes>
    )
}