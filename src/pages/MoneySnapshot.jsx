import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

//Import Images(Icons) Here
import userProfileImg from "../images/ProfilePicture.png";
//import notificationImg from "../images/active.png";
import calendarImg from "../images/calendarTwo.png";

export default function MoneySnapshot() {
    //1. Logout Button
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    //2. Income State
    const [income, setIncome] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [showIncomeInput, setShowIncomeInput] = useState(false);

    //3. Saving Goals State
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState({ name: "", amount: "" });

    //4.Fixed Expenses State
    const [expenses, setExpenses] = useState([]);
    const [expenseInput, setExpenseInput] = useState({ name: "", amount: "" });

    // Adding Saving Goal (Input) Function 
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

    // Adding Expenses (Input) Function
    function addExpense() {
        if (expenses.length >= 5) return;
        if (!expenseInput.name || !expenseInput.amount) return;

        setExpenses([
            ...expenses,
            {
                name: expenseInput.name,
                amount: Number(expenseInput.amount)
            }
        ]);

        setExpenseInput({ name: "", amount: "" });
    }

    // Accurate Date (Live)
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Log Out and Redirect to login
    function handleLogOut() {
        logOut();
        navigate("/");
    }

    // South Africa UIF Calculation (1%) Remove From Salary
    function calculateNetIncome(gross) {
        const uif = gross * 0.01;
        return {
            uif,
            net: gross - uif
        };
    }

    // Updates Pie Chart Financial Data 
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalSavings = goals.reduce((sum, g) => sum + g.amount, 0);

    // Pie Chart Data (Reads All User's Expenses)
    const chartData = [
        { name: "Income", value: income || 0 },
        { name: "Expenses", value: totalExpenses },
        { name: "Savings", value: totalSavings }
    ];

    //USER INTERFACE DESIGN HERE......(INCOME, SAVING GOALS & EXPENSES)
    return (
        <Layout>
            <header>
                <section className="user-Content">
                    <h1 className="displayUser-Name">
                        Welcome back{user?.username ? `, ${user.username}` : ""}
                    </h1>
                    {/*Username + Logout Button */}
                    <div className="logout-profile">
                        <button onClick={handleLogOut}>Log Out</button>
                        <img className="userProfile" src={userProfileImg} alt="User Profile" />
                        {/*<img className="notification" src={notificationImg} alt="Notifications" />*/}
                    </div>
                </section>
            </header>

            <main>
                <section className="page-header">
                    <h1>Money Snapshot</h1>
                     {/*Money Snapshot + Today's Date */}
                    <div className="date">
                        <img className="calendar" src={calendarImg} alt="Calendar" />
                        <p>{formattedDate}</p>
                    </div>
                </section>

                
                <section className="financeBox-Holder">

                    {/* Left Panel Containers */}
                    <div className="leftPanel">
                        {/*User's Income Box*/}
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

                            {/* Display Values (Gross Income + UIF + Income After Deductions) */}
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
                                        placeholder="Enter Income Amount (ZAR)"
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

                        {/*Financial Data - Pie Chart*/}
                        <div className="resultData">
                            <h1>Financial Management Breakdown</h1>

                            <PieChart width={300} height={300}>
                                {/*Empty Diagram of the pie*/}
                                <Pie
                                data={[{value: 100}]}
                                dataKey={"value"}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#e0e0e0"
                                isAnimationActive={false}
                                stroke="none"
                                nameKey={null}
                                legendType="none"
                                />
                                
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

                    {/* Right Panel Container */}
                    <div className="rightPanel">

                        {/* User's Saving Goals */}
                        <div className="savingGoals-Box">
                            <h1 className="mainHeading">Saving Goals</h1>
                            <h2 className="midHeading">Total Money Saved</h2>

                            <h3 className="balance">
                                R{goals.reduce((sum, g) => sum + g.amount, 0).toFixed(2)}
                            </h3>

                            {/* Input (add) Section */}
                            {goals.length < 5 && (
                                <div className="goalInputBox">

                                    <input
                                        type="text"
                                        placeholder="Enter Goal Name"
                                        value={goalInput.name}
                                        onChange={(e) =>
                                            setGoalInput({ ...goalInput, name: e.target.value })
                                        }
                                    />

                                    <input
                                        type="number"
                                        placeholder="Amount (ZAR)"
                                        value={goalInput.amount}
                                        onChange={(e) =>
                                            setGoalInput({ ...goalInput, amount: e.target.value })
                                        }
                                    />

                                    <button onClick={addGoal}>+</button>
                                </div>
                            )}

                            {/* List (5) */}
                            <div className="goalList">
                                {goals.map((g, index) => (
                                    <div key={index} className="goalItem">
                                        <p>{g.name}</p>
                                        <p>R{g.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fixed Expenses Container */}
                        <div className="fixedExpenses-Box">
                            <h1 className="mainHeading">Fixed Expenses</h1>
                            <h2 className="midHeading">Monthly Enxpenses</h2>

                            {/* Total Balance of Expenses */}
                            <h3 className="balance">
                                R{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                            </h3>

                            {/* Input Section */}
                            {expenses.length < 5 && (
                                <div className="goalInputBox">

                                    <input
                                        type="text"
                                        placeholder="Enter Expense Name"
                                        value={expenseInput.name}
                                        onChange={(e) =>
                                            setExpenseInput({ ...expenseInput, name: e.target.value })
                                        }
                                    />

                                    <input
                                        type="number"
                                        placeholder="Amount (ZAR)"
                                        value={expenseInput.amount}
                                        onChange={(e) =>
                                            setExpenseInput({ ...expenseInput, amount: e.target.value })
                                        }
                                    />

                                    <button onClick={addExpense}>+</button>
                                </div>
                            )}

                            {/* List carry (5) */}
                            <div className="goalList">
                                {expenses.map((e, index) => (
                                    <div key={index} className="goalItem">
                                        <p>{e.name}</p>
                                        <p>R{e.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}