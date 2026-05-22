import React, { useContext } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import AbsaLogo from "../images/AbsaLogo.png";
import logoutImg from "../images/logout.svg";
import simulationImg from "../images/barChart.svg";
import moneyImg from "../images/wallet.png";
import strategyImg from "../images/progress.png";
import educationImg from "../images/education.png";

export default function Navigation (){
    const navigate = useNavigate();
    const location = useLocation();
    const { logOut } = useContext(AuthContext);

    // Clears session and sends user back to login page
    function handleLogOut() {
        logOut();
        navigate("/");
    }

    return (
       <header className="navigation">
        <nav>

            {/* Logo and app name */}
            <section 
                className="brand-section"
                onClick={() => location.pathname !== "/MoneySnapshot" && navigate("/MoneySnapshot")}
                style={{ cursor: "pointer" }}
            >
                <img className="brand-logo" src={AbsaLogo} alt="Absa Logo" />
                <h1 className="brand-name">
                    <span className="font-1"> <strong>NextGen</strong>  Wealth</span>
                        Studio
                </h1>
            </section>

            {/* Sidebar navigation links */}
            <section className="sidebar">
                <ul>
                    <li 
                        onClick={() => location.pathname !== "/MoneySnapshot" && navigate("/MoneySnapshot")} 
                        style={{ cursor: location.pathname === "/MoneySnapshot" ? "default" : "pointer" }}
                        className={location.pathname === "/MoneySnapshot" ? "active" : ""}
                    >
                        <img src={moneyImg} alt="" className="nav-icon" />
                        Money Snapshot
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/StrategyTracks" && navigate("/StrategyTracks")} 
                        style={{ cursor: location.pathname === "/StrategyTracks" ? "default" : "pointer" }}
                        className={location.pathname === "/StrategyTracks" ? "active" : ""}
                    >
                        <img src={strategyImg} alt="" className="nav-icon" />
                        Strategy Track
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/SimulationLab" && navigate("/SimulationLab")} 
                        style={{ cursor: location.pathname === "/SimulationLab" ? "default" : "pointer" }}
                        className={location.pathname === "/SimulationLab" ? "active" : ""}
                    >
                        <img src={simulationImg} alt="" className="nav-icon" />
                        Simulation Lab
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/EducationHub" && navigate("/EducationHub")} 
                        style={{ cursor: location.pathname === "/EducationHub" ? "default" : "pointer" }}
                        className={location.pathname === "/EducationHub" ? "active" : ""}
                    >
                        <img src={educationImg} alt="" className="nav-icon" />
                        Education Hub
                    </li>

                    <li onClick={handleLogOut} style={{ cursor: "pointer" }}>
                        <img src={logoutImg} alt="" className="nav-icon" />
                        Log Out
                    </li>
                </ul>
            </section>

        </nav>     
       </header>
    )
}