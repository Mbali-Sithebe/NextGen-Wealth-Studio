import { useContext, useState, useMemo } from "react";
import AuthContext from "../context/AuthContext";

export default function useSimulations() {
    const { simInputs, updateSimInputs } = useContext(AuthContext);

    const [currentStudio, setCurrentStudio] = useState(0);

    const [resultsVisible, setResultsVisible] = useState(false);
    const [popup, setPopup] = useState(null);

    function setField(key, value) {

        const updated = { ...simInputs, [key]: value };

        updateSimInputs(updated);

        // RENT: auto-fill deposit (1 month rent)
        if (key === "rentMonthly") {
            const rent = parseFloat(value) || 0;

            const rentUpdate = {
                ...updated,
                rentMonthly: value,
                rentDeposit: rent
            };

            updateSimInputs(rentUpdate);
        }

        // BUY: auto-fill deposit (10% of property price)
        if (key === "buyPrice") {
            const price = parseFloat(value) || 0;

            const buyUpdate = {
                ...updated,
                buyPrice: value,
                buyDeposit: price * 0.1
            };

            updateSimInputs(buyUpdate);
        }
    }

    function formatRand(val) {
        return val > 0
            ? `R${val.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`
            : "R0";
    }

    function handleNextStudio() {
        setCurrentStudio((prev) => (prev + 1) % 3);
        setResultsVisible(false);
    }

    // STUDIO 1: Calculations
    const studio1 = useMemo(() => {
        const monthlyRent = parseFloat(simInputs.rentMonthly) || 0;
        const depositRent = parseFloat(simInputs.rentDeposit) || 0;

        const propertyPrice = parseFloat(simInputs.buyPrice) || 0;
        const depositBuy = parseFloat(simInputs.buyDeposit) || 0;

        const YEARS = 5;
        const annualRate = 11.75;

        const totalRenting = (monthlyRent * 12 * YEARS) + depositRent;

        // Bond amount after deposit
        const loanAmount = propertyPrice - depositBuy;
        const monthlyRate = annualRate / 100 / 12;
        const nPayments = YEARS * 12;

        // Proper PMT amortization formula 
        let monthlyBondPayment = 0;
        if (monthlyRate > 0 && nPayments > 0 && loanAmount > 0) {
            monthlyBondPayment = loanAmount *
                (monthlyRate * Math.pow(1 + monthlyRate, nPayments)) /
                (Math.pow(1 + monthlyRate, nPayments) - 1);
        }

        const totalBuying = (monthlyBondPayment * nPayments) + depositBuy;
        const diff = totalRenting - totalBuying;

        return {
            totalRenting,
            totalBuying,
            monthlyBondPayment,
            diff,
            cheaper: totalRenting <= totalBuying ? "Renting" : "Buying"
        };
    }, [simInputs]);

    // STUDIO 2: Calculations
    const studio2 = useMemo(() => {
        const costPerTrip = parseFloat(simInputs.uberCostPerTrip) || 0;
        const tripsPerMonth = parseFloat(simInputs.uberTripsPerMonth) || 0;

        const carPrice = parseFloat(simInputs.carPrice) || 0;
        const fuelPerMonth = parseFloat(simInputs.carFuel) || 0;
        const carDeposit = parseFloat(simInputs.carDeposit) || 0;

        const YEARS = 5;
        const carRate = 11.75;

        // Total Uber cost (one way trip)
        const monthlyUber = costPerTrip * 2 * tripsPerMonth;
        const totalUber = monthlyUber * 12 * YEARS;

        const totalCar = carPrice + (fuelPerMonth * 12 * YEARS);
        const diff = totalUber - totalCar;

        return {
            totalUber,
            totalCar,
            monthlyUber,
            diff,
            cheaper: totalUber <= totalCar ? "Uber/Bolt" : "Vehicle Ownership"
        };
    }, [simInputs]);

    // STUDIO 3: Calculations
    const studio3 = useMemo(() => {
        const weeklySpend = parseFloat(simInputs.weeklySpend) || 0;
        const monthlyBudget = parseFloat(simInputs.monthlyBudget) || 0;

        const MONTHS = 12;

        const weeklyEffectiveMonthly = weeklySpend * 4.33;
        const totalWeekly = weeklyEffectiveMonthly * MONTHS;
        const totalMonthly = monthlyBudget * MONTHS;

        const monthlySaving = Math.abs(weeklyEffectiveMonthly - monthlyBudget);
        const monthlyGrowthRate = 0.07 / 12;

        let compoundSavings = 0;
        if (monthlyGrowthRate > 0) {
            compoundSavings =
                monthlySaving *
                (Math.pow(1 + monthlyGrowthRate, MONTHS) - 1) /
                monthlyGrowthRate;
        }
        const diff = totalWeekly - totalMonthly;

        return {
            totalWeekly,
            totalMonthly,
            weeklyEffectiveMonthly,
            compoundSavings,
            diff,
            cheaper: totalWeekly <= totalMonthly ? "Weekly Shopping" : "Monthly Shopping"
        };
    }, [simInputs]);

    function handleRunSimulation() {
        let title = "";
        let message = "";
        let detail = "";

        if (currentStudio === 0) {
           if (studio1.totalRenting === 0 && studio1.totalBuying === 0) return;
           title = `${studio1.cheaper} is Cost-Effective`;
           message = `Calculations between renting and buying show a difference of R${Math.abs(studio1.diff).toLocaleString("en-ZA", { maximumFractionDigits: 0 })} saved by ${studio1.cheaper.toLowerCase()}.`;
           detail = `For more details, check the simulation results box below`;
        }

        if (currentStudio === 1) {
            if (studio2.totalUber === 0 && studio2.totalCar === 0) return;
            title = `${studio2.cheaper} is Cost-Effective`;
            message = `Calculations between Uber/Bolt and vehicle ownership show a difference of R${Math.abs(studio2.diff).toLocaleString("en-ZA", { maximumFractionDigits: 0 })} saved by ${studio2.cheaper.toLowerCase()}.`;
            detail = `For more details, check the simulation results box below`;
        }

        if (currentStudio === 2) {
            if (studio3.totalWeekly === 0 && studio3.totalMonthly === 0) return;
            title = `${studio3.cheaper} is Cost-Effective`;
            message = `Calculations between monthly and weekly shopping show a difference of R${Math.abs(studio3.diff).toLocaleString("en-ZA", { maximumFractionDigits: 0 })} saved by ${studio3.cheaper.toLowerCase()}.`;
            detail = `For more details, check the simulation results box below`;
        }

        setResultsVisible(true);
        setPopup({ title, message, detail });
    }

    return {
        simInputs,
        setField,
        formatRand,
        currentStudio,
        handleNextStudio,
        resultsVisible,
        popup,
        setPopup,
        studio1,
        studio2,
        studio3,
        handleRunSimulation
    };
}