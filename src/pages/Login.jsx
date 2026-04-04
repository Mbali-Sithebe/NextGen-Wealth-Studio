import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit (e) {
        e.preventDefault();  
        const success = login(username, password);

        if (success){
            navigate("/Dashboard");
        }
        else {
            setError("Invalid credentials. Please try again.")
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
                <h1>Hello, Friend! Login Here</h1>
                <p>Sign in or Create a new account, please be advice this application is free</p>

                <form onSubmit={handleSubmit}>
                    <div className="username">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <p>Update your login credentials</p>
                    {error && <p style={{color: "red"}}>{error}</p>}
                    <button type="submit">Log in</button>
                </form>
            </section>
        </main>
    )
}