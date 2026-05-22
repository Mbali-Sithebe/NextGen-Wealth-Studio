import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // AuthStatus (Checking if you logged in)
    const [authStatus, setAuthStatus] = useState('unknown');
    const [user, setUser] = useState(null);

    // Money Snapshot Data - stored here so it persists across pages
    const [income, setIncome] = useState(null);
    const [goals, setGoals] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Strategy Tracker Data - stored here so it persists across pages
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [trackProgress, setTrackProgress] = useState({});

    useEffect(() => {
        const mockToken = localStorage.getItem("mockToken");
        const username = localStorage.getItem("userDisplayName");

        if (mockToken && username) {
            setAuthStatus("authed");
            setUser({ username });

            // Restore saved financial data from localStorage on login
            const savedIncome = localStorage.getItem("userIncome");
            const savedGoals = localStorage.getItem("userGoals");
            const savedExpenses = localStorage.getItem("userExpenses");

            // Restore saved strategy tracker data from localStorage on login
            const savedTrack = localStorage.getItem("selectedTrack");
            const savedProgress = localStorage.getItem("trackProgress");

            if (savedIncome) setIncome(JSON.parse(savedIncome));
            if (savedGoals) setGoals(JSON.parse(savedGoals));
            if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
            if (savedTrack) setSelectedTrack(JSON.parse(savedTrack));
            if (savedProgress) setTrackProgress(JSON.parse(savedProgress));
        } else {
            setAuthStatus("guest");
        }
    }, []);

    // Saves income and syncs to localStorage
    function updateIncome(value) {
        setIncome(value);
        localStorage.setItem("userIncome", JSON.stringify(value));
    }

    // Adds a saving goal and syncs to localStorage
    function addGoal(goal) {
        const updated = [...goals, goal];
        setGoals(updated);
        localStorage.setItem("userGoals", JSON.stringify(updated));
    }

    // Adds an expense and syncs to localStorage
    function addExpense(expense) {
        const updated = [...expenses, expense];
        setExpenses(updated);
        localStorage.setItem("userExpenses", JSON.stringify(updated));
    }

    // Clears all goals from state and localStorage
    function clearGoals() {
        setGoals([]);
        localStorage.removeItem("userGoals");
    }

    // Clears all expenses from state and localStorage
    function clearExpenses() {
        setExpenses([]);
        localStorage.removeItem("userExpenses");
    }

    // Saves selected track and syncs to localStorage
    function chooseTrack(trackId) {
        setSelectedTrack(trackId);
        setTrackProgress({});
        localStorage.setItem("selectedTrack", JSON.stringify(trackId));
        localStorage.setItem("trackProgress", JSON.stringify({}));
    }

    // Updates a single milestone state and syncs to localStorage
    function updateMilestoneState(milestoneId, state) {
        const updated = { ...trackProgress, [milestoneId]: state };
        setTrackProgress(updated);
        localStorage.setItem("trackProgress", JSON.stringify(updated));
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

            // Restore this user's financial data on login
            const savedIncome = localStorage.getItem("userIncome");
            const savedGoals = localStorage.getItem("userGoals");
            const savedExpenses = localStorage.getItem("userExpenses");

            // Restore this user's strategy tracker data on login
            const savedTrack = localStorage.getItem("selectedTrack");
            const savedProgress = localStorage.getItem("trackProgress");

            if (savedIncome) setIncome(JSON.parse(savedIncome));
            if (savedGoals) setGoals(JSON.parse(savedGoals));
            if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
            if (savedTrack) setSelectedTrack(JSON.parse(savedTrack));
            if (savedProgress) setTrackProgress(JSON.parse(savedProgress));

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

        // Wipe financial data from state and localStorage on logout
        setIncome(null);
        setGoals([]);
        setExpenses([]);

        // Wipe strategy tracker data from state and localStorage on logout
        setSelectedTrack(null);
        setTrackProgress({});

        localStorage.removeItem("mockToken");
        localStorage.removeItem("userDisplayName");
        localStorage.removeItem("userIncome");
        localStorage.removeItem("userGoals");
        localStorage.removeItem("userExpenses");
        localStorage.removeItem("selectedTrack");
        localStorage.removeItem("trackProgress");
    }

    return (
        <AuthContext.Provider value={{
            authStatus,
            user,
            login,
            logOut,
            register,
            // Financial data and updaters available to all pages
            income,
            goals,
            expenses,
            updateIncome,
            addGoal,
            addExpense,
            clearGoals,
            clearExpenses,
            // Strategy tracker data and updaters available to all pages
            selectedTrack,
            trackProgress,
            chooseTrack,
            updateMilestoneState
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;