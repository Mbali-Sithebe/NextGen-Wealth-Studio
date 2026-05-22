import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import AbsaLogo from "../images/AbsaLogo.png";
import eyeOpen from "../images/eyeOpen.svg";
import eyeOff from "../images/eyeOff.svg";

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);

    // Hide or show password
    const [showPassword, setShowPassword] = useState(false);

    // Password strength validation rules
    const passwordRules = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
    };
    const passwordValid = Object.values(passwordRules).every(Boolean);

    const {login, register} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSwitchToRegister() {
        // This clears login info when switching to register form
        setUsername("");
        setPassword("");
        setShowPassword(false);
        setIsRegistering(true);
    }

    function handleSubmit (e) {
        e.preventDefault();
        const success = login(username, password);

        if (success){
            navigate("/MoneySnapshot");
        }
        else {
            alert("Invalid credentials. Please try again.");
        }
    }

    function handleRegister (e) {
        e.preventDefault();

        // Block registration if password does not meet requirements
        if (!passwordValid) {
            alert("Please ensure your password meets all requirements.");
            return;
        }

        const result = register(username, password);

        if (result.success){
            alert("Account created successfully! Please log in.");
            setUsername("");
            setPassword("");
            setShowPassword(false);
            setIsRegistering(false);
        }
        else {
            alert(result.message);
        }
    }

    return (
        <main className="login-page">
            <section className="introColumn">
                {/* INTRO COLUMN */}
                 <header className="introContext">

                    <img className="absa-logo" src={AbsaLogo} alt="Absa Logo" />
                    <h1 className="welcomeText">
                        <span className="font-1">Welcome to</span>
                        NextGen Wealth Studio
                    </h1>
                    <p className="introP">Take control of your financial journey, your story matters.</p>
                 </header>
            </section>

            {/* PASSWORD COLUMN */}
            <section className="formColumn">

                {/* Register + logging in user */}
                <h1>{isRegistering ? "Create Your Account" : "Welcome Back"}</h1>
                <p>{isRegistering ? "Fill in your details to create a new account." :
                "Sign in or create a new account to continue."}</p>

                {/* Register Form */}
                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <div className="username">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="password">
                            <label>Password</label>

                            {/* Password input wrapper for eye toggle */}
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                   <img 
                                   src={showPassword ? eyeOff : eyeOpen}
                                   alt={showPassword ? "Hide password" : "Show password"}
                                   width="20"
                                   height="18"

                                   />
                                </button>
                            </div>

                            {/* Password strength checklist */}
                            {password.length > 0 && (
                                <ul className="password-rules">
                                    <li className={passwordRules.minLength ? "rule-pass" : "rule-fail"}>
                                        At least 8 characters
                                    </li>
                                    <li className={passwordRules.hasUppercase ? "rule-pass" : "rule-fail"}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={passwordRules.hasNumber ? "rule-pass" : "rule-fail"}>
                                        At least one number
                                    </li>
                                    <li className={passwordRules.hasSpecial ? "rule-pass" : "rule-fail"}>
                                        At least one special character (!@#$%^&*)
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className="formActions">
                            <button type="submit" disabled={!passwordValid}>Create Account</button>
                        </div>
                        
                    </form>

                ) : (

                    /*Login Form */
                    <form onSubmit={handleSubmit}>
                        <div className="username">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="password">
                            <label>Password</label>

                            {/* Password input wrapper for eye toggle */}
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <img 
                                    src={showPassword ? eyeOpen : eyeOff} 
                                    alt={showPassword ? "Hide password" : "Show password"}
                                    width="20"
                                    height="18"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Link to switch to register form*/}
                        <div className="formActions">

                           <button type="submit">Log in</button>

                       <p className="formText">
                       <span className="normalText">Don't have an account? </span>

                       <span
                        className="linkText"
                        onClick={handleSwitchToRegister}
                       >
                         Sign Up
                      </span>
                      </p>
                     </div>
                    </form>
                )}

            </section>
        </main>
    )
}