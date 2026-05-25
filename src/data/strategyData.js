export const tracks = [
    {
        id: "property",
        name: "Property Ownership",
        tagline: "Ways to own a house within 4-5 years.",
        who: "Best for young professionals with stable income who want to build equity instead of paying rent.",
        cost: "Requires disciplined saving of 20–30% of net income. Lifestyle sacrifices are expected in years 1–2.",
        years: [
            {
                year: "Year 1",
                title: "Foundation",
                milestones: [
                    { id: "p1_1", text: "Open a dedicated savings account for your deposit." },
                    { id: "p1_2", text: "Save R2,000 monthly toward deposit." },
                    { id: "p1_3", text: "Clear all short-term debt (store cards, personal loans)." }
                ]
            },
            {
                year: "Year 2",
                title: "Build Credit",
                milestones: [
                    { id: "p2_1", text: "Achieve credit score above 680 (check via TransUnion)." },
                    { id: "p2_2", text: "Increase deposit savings to R3,500 per month." },
                    { id: "p2_3", text: "Research areas: compare Midrand vs Centurion bond repayments." }
                ]
            },
            {
                year: "Year 3",
                title: "Research & Pre-Qualify",
                milestones: [
                    { id: "p3_1", text: "Pre-qualify with ABSA Home Loans (free, no commitment)." },
                    { id: "p3_2", text: "Have 10% deposit saved (e.g. R100K on a R1M property)." },
                    { id: "p3_3", text: "Understand transfer duties: R1M property = R0 (first-time buyer)." }
                ]
            },
            {
                year: "Year 4",
                title: "Purchase",
                milestones: [
                    { id: "p4_1", text: "Make a formal offer on a property." },
                    { id: "p4_2", text: "Bond registered,first payment made." },
                    { id: "p4_3", text: "Set up a 1-month emergency fund separate from bond." }
                ]
            }
        ]
    },
    {
        id: "debt",
        name: "Debt Demolisher",
        tagline: "Eliminate all your debts and build from zero",
        who: "Best for young professionals carrying credit card debt, personal loans, or store accounts who want a clean financial slate.",
        cost: "You will sacrifice investing and lifestyle spending for 2–3 years. Every extra rand goes to debt.",
        years: [
            {
                year: "Year 1",
                title: "List & Attack",
                milestones: [
                    { id: "d1_1", text: "List every debt: balance, interest rate, minimum payment." },
                    { id: "d1_2", text: "Cancel all store cards (Edgars, Jet, Truworths)." },
                    { id: "d1_3", text: "Use avalanche method: attack highest interest debt first." }
                ]
            },
            {
                year: "Year 2",
                title: "Accelerate",
                milestones: [
                    { id: "d2_1", text: "Reduce debt by at least 40% from starting balance." },
                    { id: "d2_2", text: "Avoid any new credit." },
                    { id: "d2_3", text: "Direct all windfalls (bonus, tax refund) to debt." }
                ]
            },
            {
                year: "Year 3",
                title: "Final Push",
                milestones: [
                    { id: "d3_1", text: "Clear all remaining unsecured debt completely." },
                    { id: "d3_2", text: "Build R10,000 emergency fund (3-month buffer)." },
                    { id: "d3_3", text: "Open a TFSA, start investing R500/month." }
                ]
            },
            {
                year: "Year 4",
                title: "Build Wealth",
                milestones: [
                    { id: "d4_1", text: "Increase TFSA contribution to R3,000/month." },
                    { id: "d4_2", text: "Start a unit trust or ETF portfolio via ABSA." },
                    { id: "d4_3", text: "Live debt-free for 12 consecutive months." }
                ]
            }
        ]
    },
    {
        id: "investor",
        name: "Aggressive Investor",
        tagline: "Maximise wealth through early and bold investments",
        who: "Best for young professionals with no debt, stable income, and a high risk tolerance who want to grow wealth fast.",
        cost: "Requires investing 30–40% of net income. Market downturns will happen, you must stay in and not panic sell.",
        years: [
            {
                year: "Year 1",
                title: "Set the Base",
                milestones: [
                    { id: "i1_1", text: "Max out TFSA: R36,000/year (R3,000/month)." },
                    { id: "i1_2", text: "Open an ABSA stockbroking account, buy Satrix Top 40 ETF." },
                    { id: "i1_3", text: "Build 3-month emergency fund before investing anything extra." }
                ]
            },
            {
                year: "Year 2",
                title: "Diversify",
                milestones: [
                    { id: "i2_1", text: "Add offshore exposure: Satrix MSCI World ETF (USD denominated)." },
                    { id: "i2_2", text: "Invest in at least 3 different ETFs across sectors." },
                    { id: "i2_3", text: "Automate monthly debit orders, remove emotion from investing." }
                ]
            },
            {
                year: "Year 3",
                title: "Compound",
                milestones: [
                    { id: "i3_1", text: "Portfolio value target: R150,000 plus across all accounts" },
                    { id: "i3_2", text: "Reinvest all dividends, do not take them as cash." },
                    { id: "i3_3", text: "Review and rebalance portfolio." }
                ]
            },
            {
                year: "Year 4",
                title: "Accelerate",
                milestones: [
                    { id: "i4_1", text: "Explore direct share picks: research JSE-listed quality companies." },
                    { id: "i4_2", text: "Target R500,000 total portfolio by end of year 5." },
                    { id: "i4_3", text: "Consult a CFP (Certified Financial Planner) for tax optimisation." }
                ]
            }
        ]
    }
];


export const stateLabels = ["Not Started", "In Progress", "Done"];
export const stateColors = ["#ccc", "#DC0032", "#2e7d32"];

export const popupMessages = [
    {
        title: "Year 1 Complete!",
        message: "Outstanding first step. You've laid the foundation. Now it's time to build on it.",
        tip: "Stay consistent, the habits you build now define your next 4 years."
    },
    {
        title: "Year 2 Complete!",
        message: "Halfway through your track. You're ahead of most South Africans your age.",
        tip: "Review your progress against your starting point, the growth will motivate you."
    },
    {
        title: "Year 3 Complete!",
        message: "Three years in. Your discipline is compounding, just like your money.",
        tip: "Reassess your track, you may be ready to accelerate your goals."
    },
    {
        title: "Year 4 Complete!",
        message: "Track complete. You have achieved what most people only talk about.",
        tip: "Share your journey. Set your next 5-year target. The best investors never stop."
    }
];