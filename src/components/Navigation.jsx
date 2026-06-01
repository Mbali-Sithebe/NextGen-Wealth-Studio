import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import AbsaLogo from "../images/AbsaLogo.png";
import logoutImg from "../images/logout.svg";
import simulationImg from "../images/barChart.svg";
import moneyImg from "../images/wallet.png";
import strategyImg from "../images/progress.png";
import educationImg from "../images/education.png";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogOut() {
        logOut();
        navigate("/");
    }

    const navItems = [
        { path: "/MoneySnapshot", img: moneyImg, label: "Money Snapshot" },
        { path: "/StrategyTracks", img: strategyImg, label: "Strategy Track" },
        { path: "/SimulationLab", img: simulationImg, label: "Simulation Lab" },
        { path: "/EducationHub", img: educationImg, label: "Education Hub" },
    ];

    return (
        <>
            {/* MOBILE PHONE ONLY: Top Navbar Header  */}
            <header className="mobile-topbar">
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className="mobile-brand">
                    <img src={AbsaLogo} alt="Absa Logo" className="mobile-brand-logo" />
                    <h1 className="mobile-brand-name">
                        <strong>NextGen</strong> Wealth Studio
                    </h1>
                </div>
            </header>

            {/* MOBILE PHONE ONLY: Slide Overlay shadow */}
            {menuOpen && (
                <div
                    className="menu-backdrop"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* MOBILE PHONE ONLY: Drawer flyout panel */}
            <nav className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                <button
                    className="mobile-menu-close"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    ✕
                </button>

                <ul>
                    {navItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => {
                                location.pathname !== item.path && navigate(item.path);
                                setMenuOpen(false);
                            }}
                            className={location.pathname === item.path ? "active" : ""}
                            title={item.label}
                        >
                            <img src={item.img} alt={item.label} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </li>
                    ))}

                    <li onClick={handleLogOut} title="Log Out">
                        <img src={logoutImg} alt="Log Out" className="nav-icon" />
                        <span className="nav-label">Log Out</span>
                    </li>
                </ul>
            </nav>

            {/* DESKTOP & TABLET: Fixed Sidebar (Never crashes layout) */}
            <header className="navigation">
                <nav>
                    <section
                        className="brand-section"
                        onClick={() => location.pathname !== "/MoneySnapshot" && navigate("/MoneySnapshot")}
                        style={{ cursor: "pointer" }}
                    >
                        <img className="brand-logo" src={AbsaLogo} alt="Absa Logo" />
                        <h1 className="brand-name">
                            <span className="font-1"><strong>NextGen</strong> Wealth</span>
                            Studio
                        </h1>
                    </section>

                    <section className="sidebar">
                        <ul>
                            {navItems.map((item) => (
                                <li
                                    key={item.path}
                                    onClick={() => location.pathname !== item.path && navigate(item.path)}
                                    style={{ cursor: location.pathname === item.path ? "default" : "pointer" }}
                                    className={location.pathname === item.path ? "active" : ""}
                                    title={item.label}
                                >
                                    <img src={item.img} alt={item.label} className="nav-icon" />
                                    <span className="sidebar-text">{item.label}</span>
                                </li>
                            ))}

                            <li onClick={handleLogOut} style={{ cursor: "pointer" }} title="Log Out">
                                <img src={logoutImg} alt="Log Out" className="nav-icon" />
                                <span className="sidebar-text">Log Out</span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </header>
        </>
    );
}