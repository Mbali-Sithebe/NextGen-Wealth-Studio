import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import calendarImg from "../images/calendarTwo.png";
import InfoIconImg from "../images/info.png";
import AnimTipBulb from "../images/AnimTipBulb.mp4";

export default function MoneySnapshot() {
    const { user, income, goals, expenses, updateIncome, addGoal, addExpense, clearGoals, clearExpenses } = useContext(AuthContext);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [showIncomeInput, setShowIncomeInput] = useState(false);
    const [goalInput, setGoalInput] = useState({ name: "", amount: "" });
    const [expenseInput, setExpenseInput] = useState({ name: "", amount: "" });
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState({ title: "", message: "", tips: [] });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleAddGoal() {
        if (goals.length >= 3) return;
        if (!goalInput.name || !goalInput.amount) return;
        if (!/^[A-Za-z\s]+$/.test(goalInput.name)) return;
        addGoal({ name: goalInput.name, amount: Number(goalInput.amount) });
        setGoalInput({ name: "", amount: "" });
    }

    function handleAddExpense() {
        if (expenses.length >= 3) return;
        if (!expenseInput.name || !expenseInput.amount) return;
        if (!/^[A-Za-z\s]+$/.test(expenseInput.name)) return;
        addExpense({ name: expenseInput.name, amount: Number(expenseInput.amount) });
        setExpenseInput({ name: "", amount: "" });
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    function calculateNetIncome(gross) {
        const uif = gross * 0.01;
        return { uif, net: gross - uif };
    }

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalSavings = goals.reduce((sum, g) => sum + g.amount, 0);
    const netIncome = income ? calculateNetIncome(income).net : 0;
    const totalAllocated = totalExpenses + totalSavings;

    const chartData = [
        { name: "Income", value: income || 0 },
        { name: "Expenses", value: totalExpenses },
        { name: "Savings", value: totalSavings }
    ];

    function generateFeedback() {
        if (!income) {
            return {
                title: "No Income Detected",
                message: "Please enter your income before analysing your budget.",
                tips: []
            };
        }

        const savingsRate = netIncome > 0 ? (totalSavings / netIncome) * 100 : 0;
        let title = "", message = "", tips = [];

        if (totalAllocated > netIncome) {
            title = "Overspending Detected";
            message = `You are over budget by R${(totalAllocated - netIncome).toFixed(2)}.`;
            tips = [
                "Reduce non-essential expenses immediately.",
                "Prioritise essentials such as rent, food, and transport.",
                "Pause new savings goals until balance stabilises."
            ];
        } else if (totalAllocated >= netIncome * 0.8) {
            title = "Warning: Close to Budget Limit";
            message = "You are using most of your income. Financial flexibility is limited.";
            tips = [
                "Reduce fixed expenses where possible.",
                "Avoid unnecessary subscriptions or purchases.",
                "Keep a small emergency buffer."
            ];
        } else {
            title = "Budget Looks Healthy";
            message = `You have R${(netIncome - totalAllocated).toFixed(2)} remaining after budgeting.`;
            tips = [
                "Maintain your current discipline.",
                "Consider increasing savings toward 20% of income.",
                "Build or grow an emergency fund."
            ];
        }

        if (savingsRate < 20) {
            tips.push(`Savings rate is ${savingsRate.toFixed(1)}%. Recommended minimum is 20% of net income.`);
        }
        return { title, message, tips };
    }

    useEffect(() => {
        if (income && (goals.length > 0 || expenses.length > 0)) {
            const result = generateFeedback();
            setFeedback(result);
            setShowFeedback(true);
        }
    }, [income, goals, expenses]);

    // Sub-render helpers to eliminate messy structural duplications across viewport conditions
    const renderIncomeBox = () => (
        <div className="incomeBox">
            <div className="incomeHeader">
                <h1>Income Balance</h1>
                <button
                    className="addIncomeBtn"
                    onClick={() => setShowIncomeInput(!showIncomeInput)}
                >+</button>
            </div>

            <div className="incomeValues">
                <h2>Gross Income</h2>
                <h3 className="balance">
                    {income !== null ? `R${income}` : "R0.00"}
                </h3>

                <h2>UIF (1%)</h2>
                <h3 className="balance">
                    {income !== null ? `R${calculateNetIncome(income).uif.toFixed(2)}` : "R0.00"}
                </h3>

                <h2>After Deductions (Net Income)</h2>
                <h3 className="balance">
                    {income !== null ? `R${calculateNetIncome(income).net.toFixed(2)}` : "R0.00"}
                </h3>
            </div>

            {showIncomeInput && (
                <div className="incomeInputBox">
                    <input
                        type="number"
                        placeholder="Enter Income Amount (ZAR)"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    
                    <button onClick={() => {
                        updateIncome(Number(inputValue));
                        clearGoals();
                        clearExpenses();
                        setInputValue("");
                        setShowIncomeInput(false);
                    }}>Save</button>
                </div>
            )}
        </div>
    );

    const renderPieChart = () => (
        <div className="resultData">
            <h1>Financial Management Breakdown</h1>
            <PieChart width={350} height={350}>
                <Pie
                    data={[{ value: 100 }]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="none"
                    isAnimationActive={false}
                    stroke="#2e2d2d"
                    strokeWidth={2}
                    legendType="none"
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={false}
                >
                    <Cell fill="#640032" />
                    <Cell fill="#DC0032" />
                    <Cell fill="#C95326" />
                </Pie>
                {/* Tooltip*/}
                <Tooltip formatter={(value, name) => [`R${value}`, name]} />
                <Legend
                    formatter={(value) => (
                        <span style={{ color: "#343131", fontSize: "14px" }}>{value}</span>
                    )}
                    payload={[
                        { value: "Income", type: "circle", color: "#640032" },
                        { value: "Expenses", type: "circle", color: "#DC0032" },
                        { value: "Savings", type: "circle", color: "#C95326" },
                    ]}
                />
            </PieChart>
        </div>
    );

    const renderSavingGoals = () => (
        <div className="savingGoals-Box">
            <h1 className="mainHeading">Saving Goals</h1>
            <h3 className="balance">
                R{goals.reduce((sum, g) => sum + g.amount, 0).toFixed(2)}
            </h3>
            {goals.length < 3 && (
                <div className="goalInputBox">
                    <input
                        type="text"
                        placeholder="Enter Goal Name"
                        value={goalInput.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[A-Za-z\s]*$/.test(value)) {
                                setGoalInput({ ...goalInput, name: value });
                            }
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Amount (ZAR)"
                        value={goalInput.amount}
                        onChange={(e) => setGoalInput({ ...goalInput, amount: e.target.value })}
                    />
                    <button onClick={handleAddGoal}>+</button>
                </div>
            )}
        </div>
    );

    const renderFixedExpenses = () => (
        <div className="fixedExpenses-Box">
            <h1 className="mainHeading">Fixed Expenses</h1>
            <h3 className="balance">
                R{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
            </h3>
            {expenses.length < 3 && (
                <div className="goalInputBox">
                    <input
                        type="text"
                        placeholder="Enter Expense Name"
                        value={expenseInput.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[A-Za-z\s]*$/.test(value)) {
                                setExpenseInput({ ...expenseInput, name: value });
                            }
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Amount (ZAR)"
                        value={expenseInput.amount}
                        onChange={(e) => setExpenseInput({ ...expenseInput, amount: e.target.value })}
                    />
                    <button onClick={handleAddExpense}>+</button>
                </div>
            )}
        </div>
    );

    return (
        <Layout>
            {/* Feedback Modal */}
            {showFeedback && (
                <div className="feedback-overlay" onClick={() => setShowFeedback(false)}>
                    <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="feedbackTitle">
                            <video
                                src={AnimTipBulb}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="feedbackTitleIcon"
                            />
                        </div>
                        <p className={`feedbackMessage ${feedback.title.includes("Healthy") ? "healthy" : "warning"}`}>
                            {feedback.title}
                        </p>
                        <p>{feedback.message}</p>
                        {feedback.tips.length > 0 && (
                            <ul>
                                {feedback.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                            </ul>
                        )}
                        <button onClick={() => setShowFeedback(false)}>Got it</button>
                    </div>
                </div>
            )}

            <header>
                <section className="user-Content">
                    <h1 className="displayUser-Name">
                        Welcome{user?.username ? ` ${user.username}` : ""}
                    </h1>
                </section>
            </header>

            <main>
                <section className="page-header">
                    <h1>Money Snapshot</h1>
                    <p className="pageIntro">
                        Track your income, set monthly saving goals, and manage your fixed expenses all in one place.
                        Add your salary to get started, then log what you save and spend each month.
                    </p>
                    <div className="date">
                        <img className="calendar" src={calendarImg} alt="Calendar" />
                        <p>{formattedDate}</p>
                    </div>
                </section>

                <section className="financeBox-Holder">
                    {isMobile ? (
                        /*  Wrappers for Mobile Dimensions Only*/
                        <div className="mobilePanel" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {renderIncomeBox()}
                            {renderSavingGoals()}
                            {renderFixedExpenses()}
                            {renderPieChart()}
                        </div>
                    ) : (
                        /* Wrappers for Tablets, iPads and Laptops */
                        <>
                            <div className="leftPanel">
                                {renderIncomeBox()}
                                {renderPieChart()}
                            </div>
                            <div className="rightPanel">
                                {renderSavingGoals()}
                                {renderFixedExpenses()}
                            </div>
                        </>
                    )}
                </section>
            </main>
        </Layout>
    );
}