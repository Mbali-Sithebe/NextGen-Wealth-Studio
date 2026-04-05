import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './App.css'

// Import All Other Pages That You Will Create Above: (Money snapshot, Strategy Tracks, Simulation lab and Education hub)

function AppRoutes(){
    const { authStatus } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}/>
                {/* Dashboard is protected - only authed users can access it */}
                <Route path='/Dashboard' element={authStatus === "authed" ? 
                <Dashboard/> : <Navigate to="/Login"/>}/>
                {/* Redirect any unknown path to Login */}
                <Route path='*' element={<Navigate to="/Login"/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default function App(){
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}