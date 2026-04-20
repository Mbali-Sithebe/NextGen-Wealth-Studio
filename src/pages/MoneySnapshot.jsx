import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//Images Import Section
import userProfileImg from "../images/ProfilePicture.png";
import notificationImg from "../images/active.png";
import calendarImg from "../images/calendarTwo.png";

export default function MoneySnapshot() {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // Income state
    const [income, setIncome] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [showIncomeInput, setShowIncomeInput] = useState(false);

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

    // UIF CALCULATION (1%)
    function calculateNetIncome(gross) {
        const uif = gross * 0.01;
        return {
            uif,
            net: gross - uif
        };
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
                <section className="financeBox-Holder">

                    {/*Income*/}
                    <div className="incomeBox">

                        <div className="incomeHeader">
                            <h1>Income</h1>
                        </div>

                        {/* GROSS INCOME SECTION */}
                        <div className="incomeValues">

                            <h2>Gross Income</h2>
                            <h3 className="balance">
                                {income !== null ? `R${income}` : "R0.00"}
                            </h3>

                            {/* PLUS BUTTON + INPUT UNDER GROSS INCOME */}
                            <div className="grossInputArea">

                                <button
                                    className="addIncomeBtn"
                                    onClick={() => setShowIncomeInput(!showIncomeInput)}
                                >
                                    +
                                </button>

                                {showIncomeInput && (
                                    <div className="incomeInputBox">
                                        <input
                                            type="number"
                                            placeholder="Enter income amount (R)"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />

                                        <button
                                            onClick={() => {
                                                setIncome(Number(inputValue));
                                                setInputValue("");
                                                setShowIncomeInput(false);
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}

                            </div>

                            {/* UIF */}
                            <h2>UIF (1%)</h2>
                            <h3 className="balance">
                                {income !== null
                                    ? `R${calculateNetIncome(income).uif.toFixed(2)}`
                                    : "R0.00"}
                            </h3>

                            {/* NET INCOME */}
                            <h2>After Deductions (Net Income)</h2>
                            <h3 className="balance">
                                {income !== null
                                    ? `R${calculateNetIncome(income).net.toFixed(2)}`
                                    : "R0.00"}
                            </h3>

                        </div>
                    </div>

                    {/*Data Pie Chart*/}
                    <div className="resultData">
                        <h1>Financial Manangement Breakdown</h1>
                        <span className="pieChart"></span>
                    </div>

                    <div className="savingGoals-Box">
                        <h1>Saving Goals</h1>
                        <h2>Money Saved Balance</h2>
                        <h3 className="balance">R0.00</h3>

                        {/*Input Boxes*/}
                        <div className="inputSections">
                            <p>add saving goals...</p>
                            <p>add saving goals...</p>
                            <p>+</p>
                        </div>
                    </div>

                    <div className="fixedExpenses-Box">
                        <h1>Fixed Expenses</h1>
                        <div className="addSection">
                            <p>add your fixed expenses</p>
                            <p>add your fixed expenses</p>
                            <p>+</p>
                        </div>
                        <h3 className="balance">R0.00</h3>
                    </div>

                </section>
            </main>
        </Layout>
    );
}