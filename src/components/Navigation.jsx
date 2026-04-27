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
                        onClick={() => location.pathname !== "/MoneySnapshot" && navigate("/MoneySnapshot")} 
                        style={{ cursor: location.pathname === "/MoneySnapshot" ? "default" : "pointer" }}
                        className={location.pathname === "/MoneySnapshot" ? "active" : ""}
                    >
                        Money Snapshot
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/StrategyTracks" && navigate("/StrategyTracks")} 
                        style={{ cursor: location.pathname === "/StrategyTracks" ? "default" : "pointer" }}
                        className={location.pathname === "/StrategyTracks" ? "active" : ""}
                    >
                        Strategy Track
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/SimulationLab" && navigate("/SimulationLab")} 
                        style={{ cursor: location.pathname === "/SimulationLab" ? "default" : "pointer" }}
                        className={location.pathname === "/SimulationLab" ? "active" : ""}
                    >
                        Simulation Lab
                    </li>

                    <li 
                        onClick={() => location.pathname !== "/EducationHub" && navigate("/EducationHub")} 
                        style={{ cursor: location.pathname === "/EducationHub" ? "default" : "pointer" }}
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