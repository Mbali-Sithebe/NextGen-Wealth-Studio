import React, { useContext } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";

export default function MoneySnapshot() {
    const { user } = useContext(AuthContext);

    return (
        <Layout>
            <h1>  
            Welcome back{user?.username ? `, ${user.username}` : ""} 
            </h1>
        </Layout>
    );
}