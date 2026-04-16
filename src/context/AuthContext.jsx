import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // AuthStatus (Checking if you logged in)
    const [authStatus, setAuthStatus] = useState('unknown'); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const mockToken = localStorage.getItem("mockToken");
        const username = localStorage.getItem("userDisplayName"); // renamed from displayName

        if (mockToken && username){
            setAuthStatus("authed");
            setUser({username}); // changed from {displayName} to {username}
        }
        else {
            setAuthStatus("guest");
        }
    }, []);

    function login(username, password){
        //1.Trim spaces to avoid whitespace issues
        //2. Prevent empty credentials from logging in
        //3. Get the saved users list from localStorage, if none exist start with empty array
        //4.  Check if a user exists with matching username AND password
        username = username.trim();
        password = password.trim();

        if (!username || !password) return false;
        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = savedUsers.find(u => u.username === username && u.password === password);

        if (foundUser){
            setAuthStatus("authed");
            setUser({username}); // changed from {displayName: username} to {username}
            localStorage.setItem("userDisplayName", username);
            localStorage.setItem("mockToken", "abcdefghijklmnopqrstuvwxyz");
            return true;
        }
        return false;
    }

    function register(username, password){
        username = username.trim();
        password = password.trim();

        if (!username || !password){
            return {success: false, message: "Please fill in all fields"};
        }

        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = savedUsers.findIndex(u => u.username === username);

        if (userIndex !== -1){
            savedUsers[userIndex].password = password;
        }
        else {
            savedUsers.push({username, password});
        }
        localStorage.setItem("users", JSON.stringify(savedUsers));
        return {success: true, message: "Account created successfully!"};
    }

    function logOut(){
        setAuthStatus("guest");
        setUser(null);
        localStorage.removeItem("mockToken");
        localStorage.removeItem("userDisplayName");
    }

    return (
        <AuthContext.Provider value={{authStatus, user, login, logOut, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;