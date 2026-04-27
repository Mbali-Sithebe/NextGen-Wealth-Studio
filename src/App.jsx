import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'  
import { useContext } from 'react'
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';

// ... your imports stay the same

export default function App(){
    return (
        <AuthProvider>
            <HashRouter>  }
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