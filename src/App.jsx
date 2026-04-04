import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthContext from './context/AuthContext';
import './App.css'

// Include Components That Will Be Created Also
// Import All Other Pages That You Will Create Above: (Money snapshot, Strategy Tracks, Simulation lab and Education hub)

export default function App(){
    // AuthStatus (Checking if you logged in) 
    const [authStatus, setAuthStatus] = useState('unknown'); // unknown - guest - authed
    const [user, setUser] = useState(null);

    //UseEffect - still dont fully understand 
    useEffect (() => {
        const mockToken = localStorage.getItem("mockItem");
        const displayName = localStorage.getItem(userNameDisplay);

        if (mockToken && displayName){
            setAuthStatus("authed");
            setUser({displayName});
        }
        else {
            setAuthStatus("guest")
        }
    }, []);

    function login(username, password){
    if (username === 'Mbali' && password === 'password') {
        setAuthStatus("authed");
        setUser({displayName: username});
        localStorage.setItem('userDisplayName', username);
        localStorage.setItem("mockToken", "abcdefghijklmnopqrstuvwxyz");
        return true;
    }
    return false;
}

    function logOut (){
        setAuthStatus ("guest");
        setUser (null);
        localStorage.removeItem("mockToken");
        localStorage.removeItem("userDisplay");
    }
  
    //Routing Pages Here:
    return (
        <div>
        <AuthContext.Provider value={{authStatus, user, login, logOut}}>
          <BrowserRouter>
            <Routes>
              <Route path='/Login' element={<Login/>}/>
              <Route path='/Dashboard' element={<Dashboard/>}/>
           </Routes>
         </BrowserRouter>
        </AuthContext.Provider>
        </div>
    )
}

