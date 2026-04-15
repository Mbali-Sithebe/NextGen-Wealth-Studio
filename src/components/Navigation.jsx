import React from "react"; 
import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation (){
    const navigate = useNavigate();
    const location = useLocation(); 

    return (
       <header className="navigation">
        <nav>

            {/* Logo and app name */}
            <section className="brand-logo">
                <img src="" className="navigation-logo" alt="" />
                <h1 className="brand-name">
                    <span className="font-1">NextGen</span>
                    Wealth Studio
                </h1>
            </section>

            {/* Sidebar navigation links */}
            <section className="sidebar">
                <ul>
                    <li 
                        onClick={() => navigate("/MoneySnapshot")} 
                        style={{ cursor: "pointer" }}
                        className={location.pathname === "/MoneySnapshot" ? "active" : ""}
                    >
                        Money Snapshot
                    </li>

                    <li 
                        onClick={() => navigate("/StrategyTracks")} 
                        style={{ cursor: "pointer" }}
                        className={location.pathname === "/StrategyTracks" ? "active" : ""}
                    >
                        Strategy Track
                    </li>

                    <li 
                        onClick={() => navigate("/SimulationLab")} 
                        style={{ cursor: "pointer" }}
                        className={location.pathname === "/SimulationLab" ? "active" : ""}
                    >
                        Simulation Lab
                    </li>

                    <li 
                        onClick={() => navigate("/EducationHub")} 
                        style={{ cursor: "pointer" }}
                        className={location.pathname === "/EducationHub" ? "active" : ""}
                    >
                        Education Hub
                    </li>
                </ul>
            </section>

        </nav>     
       </header>
    )
}