import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

    // Saving Goals state (MISSING BEFORE → FIXED)
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState({ name: "", amount: "" });

    // Add Goal function (MISSING BEFORE → FIXED)
    function addGoal() {
        if (goals.length >= 5) return;
        if (!goalInput.name || !goalInput.amount) return;

        setGoals([
            ...goals,
            {
                name: goalInput.name,
                amount: Number(goalInput.amount)
            }
        ]);

        setGoalInput({ name: "", amount: "" });
    }

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

    // Pie Chart Data (SAFE LOCATION)
    const chartData = [
        { name: "Income", value: income || 0 },
        { name: "Expenses", value: 2000 },
        { name: "Savings", value: income ? income * 0.3 : 0 }
    ];

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

                    {/* LEFT PANEL */}
                    <div className="leftPanel">

                        {/*Income*/}
                        <div className="incomeBox">

                            <div className="incomeHeader">
                                <h1>Income</h1>

                                <button
                                    className="addIncomeBtn"
                                    onClick={() => setShowIncomeInput(!showIncomeInput)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Display Values */}
                            <div className="incomeValues">

                                <h2>Gross Income</h2>
                                <h3 className="balance">
                                    {income !== null ? `R${income}` : "R0.00"}
                                </h3>

                                <h2>UIF (1%)</h2>
                                <h3 className="balance">
                                    {income !== null
                                        ? `R${calculateNetIncome(income).uif.toFixed(2)}`
                                        : "R0.00"}
                                </h3>

                                <h2>After Deductions (Net Income)</h2>
                                <h3 className="balance">
                                    {income !== null
                                        ? `R${calculateNetIncome(income).net.toFixed(2)}`
                                        : "R0.00"}
                                </h3>

                            </div>

                            {/* Input Section */}
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

                        {/*Data Pie Chart*/}
                        <div className="resultData">
                            <h1>Financial Management Breakdown</h1>

                            <PieChart width={300} height={300}>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    <Cell fill="#000000" />
                                    <Cell fill="#666666" />
                                    <Cell fill="#999999" />
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="rightPanel">

                        {/* Saving Goals */}
                        <div className="savingGoals-Box">
                            <h1>Saving Goals</h1>
                            <h2>Total Saved</h2>

                            <h3 className="balance">
                                R{goals.reduce((sum, g) => sum + g.amount, 0).toFixed(2)}
                            </h3>

                            {/* INPUT BOX */}
                            {goals.length < 5 && (
                                <div className="goalInputBox">

                                    <input
                                        type="text"
                                        placeholder="Goal name"
                                        value={goalInput.name}
                                        onChange={(e) =>
                                            setGoalInput({ ...goalInput, name: e.target.value })
                                        }
                                    />

                                    <input
                                        type="number"
                                        placeholder="Amount (R)"
                                        value={goalInput.amount}
                                        onChange={(e) =>
                                            setGoalInput({ ...goalInput, amount: e.target.value })
                                        }
                                    />

                                    <button onClick={addGoal}>+</button>
                                </div>
                            )}

                            {/* LIST */}
                            <div className="goalList">
                                {goals.map((g, index) => (
                                    <div key={index} className="goalItem">
                                        <p>{g.name}</p>
                                        <p>R{g.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fixed Expenses */}
                        <div className="fixedExpenses-Box">
                            <h1>Fixed Expenses</h1>
                            <div className="addSection">
                                <p>add your fixed expenses</p>
                                <p>add your fixed expenses</p>
                                <p>+</p>
                            </div>
                            <h3 className="balance">R0.00</h3>
                        </div>

                    </div>

                </section>
            </main>
        </Layout>
    );
}