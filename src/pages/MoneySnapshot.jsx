import React, { useContext } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";

export default function MoneySnapshot() {
    const { user } = useContext(AuthContext);

    return (
        <Layout>
            <header>
                <section className="display-userContent">
                    <h1 className="displayName">  
                        Welcome back{user?.username ? `, ${user.username}` : ""} 
                    </h1>

                    <div className="logout-profile">
                        <button>Log Out</button>
                        <img className="userProfile" src="" alt="" />
                        <img className="notification" src="" alt="" />
                    </div>
                </section>
            </header>

            <main>
                <section>
                    <h1>Money Snapshot</h1>
                    <div className="date"></div>
                </section>
            </main>
           
        </Layout>
    );
}