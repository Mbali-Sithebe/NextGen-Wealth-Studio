import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Checks if you logged in
    const [authStatus, setAuthStatus] = useState('unknown');
    const [user, setUser] = useState(null);

    // Money Snapshot Data
    const [income, setIncome] = useState(null);
    const [goals, setGoals] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Strategy Tracker Data 
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [trackProgress, setTrackProgress] = useState({});

    // Simulation Lab Data 
    const [simInputs, setSimInputs] = useState({
        rentMonthly: "", rentDeposit: "", rentYears: "",
        buyPrice: "", buyDeposit: "", buyRate: "", buyYears: "",
       
        uberCostPerTrip: "", uberTripsPerMonth: "", uberYears: "",
        carPrice: "", carDeposit: "", carRate: "", carFuel: "", carYears: "",
       
        weeklySpend: "", weeklyMonths: "",
        monthlyBudget: "", monthlyExtras: "", monthlyMonths: ""
    });

    useEffect(() => {
        const mockToken = localStorage.getItem("mockToken");
        const username = localStorage.getItem("userDisplayName");

        if (mockToken && username) {
            setAuthStatus("authed");
            setUser({ username });

            // Restore saved financial data + strategy tracker data + simulation data from localStorage on login
            const savedIncome = localStorage.getItem("userIncome");
            const savedGoals = localStorage.getItem("userGoals");
            const savedExpenses = localStorage.getItem("userExpenses");

            const savedTrack = localStorage.getItem("selectedTrack");
            const savedProgress = localStorage.getItem("trackProgress");

            const savedSimInputs = localStorage.getItem("simInputs");

            if (savedIncome) setIncome(JSON.parse(savedIncome));
            if (savedGoals) setGoals(JSON.parse(savedGoals));
            if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
            if (savedTrack) setSelectedTrack(JSON.parse(savedTrack));
            if (savedProgress) setTrackProgress(JSON.parse(savedProgress));
            if (savedSimInputs) setSimInputs(JSON.parse(savedSimInputs));
        } else {
            setAuthStatus("guest");
        }
    }, []);

    function updateIncome(value) {
        setIncome(value);
        localStorage.setItem("userIncome", JSON.stringify(value));
    }

    // Adds a saving goal + expense and syncs to localStorage
    function addGoal(goal) {
        const updated = [...goals, goal];
        setGoals(updated);
        localStorage.setItem("userGoals", JSON.stringify(updated));
    }

    function addExpense(expense) {
        const updated = [...expenses, expense];
        setExpenses(updated);
        localStorage.setItem("userExpenses", JSON.stringify(updated));
    }

    // Clears all goals + expenses from state and localStorage
    function clearGoals() {
        setGoals([]);
        localStorage.removeItem("userGoals");
    }

    function clearExpenses() {
        setExpenses([]);
        localStorage.removeItem("userExpenses");
    }

    function chooseTrack(trackId) {
        setSelectedTrack(trackId);
        localStorage.setItem("selectedTrack", JSON.stringify(trackId));
    }

    // Updates a single milestone state + simulation inputs and syncs to localStorage
    function updateMilestoneState(milestoneId, state) {
        const updated = { ...trackProgress, [milestoneId]: state };
        setTrackProgress(updated);
        localStorage.setItem("trackProgress", JSON.stringify(updated));
    }

    function updateSimInputs(fields) {
        const updated = { ...simInputs, ...fields };
        setSimInputs(updated);
        localStorage.setItem("simInputs", JSON.stringify(updated));
    }

    function login(username, password) {
        //1.Trim spaces to avoid whitespace issues
        //2. Prevent empty credentials from logging in
        //3. Get the saved users list from localStorage, if none exist start with empty array
        //4. Check if a user exists with matching username AND password
        username = username.trim();
        password = password.trim();

        if (!username || !password) return false;
        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = savedUsers.find(u => u.username === username && u.password === password);

        if (foundUser) {
            setAuthStatus("authed");
            setUser({ username });
            localStorage.setItem("userDisplayName", username);
            localStorage.setItem("mockToken", "abcdefghijklmnopqrstuvwxyz");

            // Restore this user's financial data + strategy tracker data + simulation data on login
            const savedIncome = localStorage.getItem("userIncome");
            const savedGoals = localStorage.getItem("userGoals");
            const savedExpenses = localStorage.getItem("userExpenses");

            const savedTrack = localStorage.getItem("selectedTrack");
            const savedProgress = localStorage.getItem("trackProgress");

            const savedSimInputs = localStorage.getItem("simInputs");

            if (savedIncome) setIncome(JSON.parse(savedIncome));
            if (savedGoals) setGoals(JSON.parse(savedGoals));
            if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
            if (savedTrack) setSelectedTrack(JSON.parse(savedTrack));
            if (savedProgress) setTrackProgress(JSON.parse(savedProgress));
            if (savedSimInputs) setSimInputs(JSON.parse(savedSimInputs));

            return true;
        }
        return false;
    }

    function register(username, password) {
        username = username.trim();
        password = password.trim();

        if (!username || !password) {
            return { success: false, message: "Please fill in all fields" };
        }

        const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = savedUsers.findIndex(u => u.username === username);

        if (userIndex !== -1) {
            savedUsers[userIndex].password = password;
        } else {
            savedUsers.push({ username, password });
        }
        localStorage.setItem("users", JSON.stringify(savedUsers));
        return { success: true, message: "Account created successfully!" };
    }

    function logOut() {
        setAuthStatus("guest");
        setUser(null);

        // Wipe financial data + strategy tracker data + simulation data from state and localStorage on logout
        setIncome(null);
        setGoals([]);
        setExpenses([]);

        setSelectedTrack(null);
        setTrackProgress({});

        setSimInputs({
            rentMonthly: "", rentDeposit: "", rentYears: "",
            buyPrice: "", buyDeposit: "", buyRate: "", buyYears: "",
            uberCostPerTrip: "", uberTripsPerMonth: "", uberYears: "",
            carPrice: "", carDeposit: "", carRate: "", carFuel: "", carYears: "",
            weeklySpend: "", weeklyMonths: "",
            monthlyBudget: "", monthlyExtras: "", monthlyMonths: ""
        });

        localStorage.removeItem("mockToken");
        localStorage.removeItem("userDisplayName");
        localStorage.removeItem("userIncome");
        localStorage.removeItem("userGoals");
        localStorage.removeItem("userExpenses");
        localStorage.removeItem("selectedTrack");
        localStorage.removeItem("trackProgress");
        localStorage.removeItem("simInputs");
    }

    return (
        <AuthContext.Provider value={{
            authStatus,
            user,
            login,
            logOut,
            register,
            // Financial data
            income,
            goals,
            expenses,
            updateIncome,
            addGoal,
            addExpense,
            clearGoals,
            clearExpenses,
            // Strategy tracker data
            selectedTrack,
            trackProgress,
            chooseTrack,
            updateMilestoneState,
            // Simulation lab inputs
            simInputs,
            updateSimInputs
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;