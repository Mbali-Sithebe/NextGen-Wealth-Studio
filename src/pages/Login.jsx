import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); 

    const {login, register} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSwitchToRegister() {
        // Clear all fields and errors when switching to register form
        setUsername("");
        setPassword("");
        setError("");
        setIsRegistering(true);
    }

    function handleSubmit (e) {
        e.preventDefault();  
        const success = login(username, password);

        if (success){
            navigate("/Dashboard");
        }
        else {
            alert("Invalid credentials. Please try again.");
        }
    }

    function handleRegister (e) {
        e.preventDefault();
        const result = register(username, password);

        if (result.success){
            alert("Account created successfully! Please log in.");
            setUsername("");
            setPassword("");
            setIsRegistering(false);
        }
        else {
            alert(result.message);
        }
    }

    return (
        <main className="login-page">
            <section className="introColumn">
                {/* separate background colour here */}
                 <header className="introContext">
                    <img className="absa-logo" src="" alt="logo placeholder" />

                    <h1 className="welcomeText">
                        <span className="font-1">Welcome to</span>
                        NextGen Wealth Studio
                    </h1>
                    <p className="introP">Take control of your financial future, your story matters</p>
                 </header>
            </section>

            {/* second column here */}
            <section className="formColumn">

                {/* Switches heading depending on if user is registering or logging in */}
                <h1>{isRegistering ? "Create Your Account" : "Hello, Friend! Login Here"}</h1>
                <p>{isRegistering ? "Fill in your details to create a new account" : 
                "Sign in or create a new account, please be advised this application is free"}</p>

                {/* Switches between login and register form depending on isRegistering state */}
                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <div className="username">
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="password">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <button type="submit">Create Account</button>
                    </form>

                ) : (

                    /* Login Form */
                    <form onSubmit={handleSubmit}>
                        <div className="username">
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="password">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        {/* Link to switch to register form - clears all fields and errors */}
                        <p onClick={handleSwitchToRegister} style={{cursor: "pointer", 
                            textDecoration: "underline"}}>
                            New user? Create an account here
                        </p>

                        <button type="submit">Log in</button>
                    </form>
                )}

            </section>
        </main>
    )
}