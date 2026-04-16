import React, { useContext } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";

//Images Import Section
import userProfileImg from "../images/ProfilePicture.png";
import notificationImg from "../images/active.png";

export default function MoneySnapshot() {
    const { user } = useContext(AuthContext);

    return (
        <Layout>
            <header>
                <section className="user-Content">
                    <h1 className="displayName">  
                        Welcome back{user?.username ? `, ${user.username}` : ""} 
                    </h1>

                    <div className="logout-profile">
                        <button>Log Out</button>
                        <img className="userProfile" src={userProfileImg} alt="User Profile" />
                        <img className="notification" src={notificationImg} alt="Notifications" />
                    </div>
                </section>
            </header>

            <main>
                <section className="page-header">
                    <h1>Money Snapshot</h1>
                    <div className="date"></div>
                </section>
            </main>
           
        </Layout>
    );
}