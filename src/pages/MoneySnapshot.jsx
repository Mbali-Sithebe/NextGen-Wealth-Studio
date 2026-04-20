import React, { useContext } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//Images Import Section
import userProfileImg from "../images/ProfilePicture.png";
import notificationImg from "../images/active.png";
import calendarImg from "../images/calendarTwo.png"

export default function MoneySnapshot() {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // Live date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Log out and redirect to login
    function handleLogOut() {
        logOut();
        navigate("/");
    }

    return (
        <Layout>
            <header>
                <section className="user-Content">
                    <h1 className="displayName">  
                        Welcome back{user?.username ? `, ${user.username}` : ""} 
                    </h1>

                    <div className="logout-profile">
                        <button onClick={handleLogOut}>Log Out</button>
                        <img className="userProfile" src={userProfileImg} alt="User Profile" />
                        <img className="notification" src={notificationImg} alt="Notifications" />
                    </div>
                </section>
            </header>

            <main>
                <section className="page-header">
                    <h1>Money Snapshot</h1>
                    <div className="date">
                        <img className="calendar" src={calendarImg} alt="Calendar" />
                        <p>{formattedDate}</p>
                    </div>
                </section>

                {/*Financial Content*/}
                <section className="financeBox-Holder"></section>
            </main>
           
        </Layout>
    );
}