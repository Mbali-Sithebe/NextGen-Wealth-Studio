import React from "react";
import Layout from "../components/layout";
import InfoIconImg from "../images/info.png";
import AnimTipBulb from "../images/AnimTipBulb.mp4";

// Custom hook — all calculations and logic live here
import useSimulations from "../data/useSimulations";

export default function SimulationLab() {
    // All state, calculations and handlers come from the hook
    const {
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
    } = useSimulations();

    // Active result values by current studio
    const activeResult = currentStudio === 0 ? studio1 : currentStudio === 1 ? studio2 : studio3;
    const leftLabel    = currentStudio === 0 ? "Renting" : currentStudio === 1 ? "Uber/Bolt" : "Weekly Shopping";
    const rightLabel   = currentStudio === 0 ? "Buying" : currentStudio === 1 ? "Vehicle" : "Monthly Shopping";
    const leftValue    = currentStudio === 0 ? studio1.totalRenting : currentStudio === 1 ? studio2.totalUber : studio3.totalWeekly;
    const rightValue   = currentStudio === 0 ? studio1.totalBuying : currentStudio === 1 ? studio2.totalCar : studio3.totalMonthly;

    return (
        <Layout>
            <header>
                <section className="labContent">
                    <h1>Simulation Lab</h1>
                    <p>
                        Let your future unfold by exploring your financial choices with our interactive simulations.
                        Fill in your values and press Run Simulation to see your results.
                    </p>
                </section>
            </header>

            <main>
                <section className="interactive-Boxes">

                    {/* STUDIO 1: Rent vs Buy */}
                    {currentStudio === 0 && (
                        <div className="studio-1">
                            <button className="studioNavBtn" onClick={handleNextStudio}>
                                Studio 1 of 3 →
                            </button>

                            <div className="intro">
                                <h1>
                                    Renting vs Buying Property
                                    <span className="infoIcon">
                                        <img src={InfoIconImg} alt="info" />
                                        <span className="tooltip">
                                            Compare the true long-term cost of renting versus buying property in South Africa.
                                        </span>
                                    </span>
                                </h1>

                                <p>
                                    This studio helps you to compare the total long-term cost of renting a home versus buying property in South Africa. 
                                </p>
                            </div>

                            <div className="simulation">

                                <div className="rentingBox">
                                    <h2>Renting</h2>

                                    <label>Monthly Rent (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R8 500"
                                        value={simInputs.rentMonthly}
                                        onChange={(e) => setField("rentMonthly", e.target.value)}
                                    />

                                    <label>Deposit (R)
                                      <span className="infoIcon">
                                            <img src={InfoIconImg} alt="info" />
                                            <span className="tooltip">You pay a deposit of 1 month rent upfront, and it’s refundable 
                                              when you leave if there are no damages or unpaid costs.</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R8 500"
                                        value={simInputs.rentDeposit}
                                        onChange={(e) => setField("rentDeposit", e.target.value)}
                                    />

                                    <label>Years Renting</label>
                                    <input
                                        type="number"
                                        placeholder="5 YEARS"
                                        value={simInputs.rentYears}
                                        disabled
                                    />
                                </div>

                                <div className="buyingBox">
                                    <h2>Buying Property</h2>

                                    <label>Property Price (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R950 000"
                                        value={simInputs.buyPrice}
                                        onChange={(e) => setField("buyPrice", e.target.value)}
                                    />

                                    <label>Deposit (R)
                                       <span className="infoIcon">
                                            <img src={InfoIconImg} alt="info" />
                                            <span className="tooltip">You pay a deposit 10%–20% of the house price 
                                              upfront as part of the purchase, and it is not refundable.</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R95 000"
                                        value={simInputs.buyDeposit}
                                        onChange={(e) => setField("buyDeposit", e.target.value)}
                                    />

                                    <label>Bond Term (Years)</label>
                                    <input
                                        type="number"
                                        placeholder="5 YEARS"
                                        value={simInputs.buyYears}
                                        disabled
                                    />
                                </div>
                            </div>

                            <section className="resultButton">
                                <button className="resultBtn" onClick={handleRunSimulation}>
                                    Run Simulation
                                </button>
                            </section>
                        </div>
                    )}

                    {/* STUDIO 2: Uber vs Vehicle */}
                    {currentStudio === 1 && (
                        <div className="studio-2">

                            <button className="studioNavBtn" onClick={handleNextStudio}>
                                Studio 2 of 3 →
                            </button>

                            <div className="intro">
                                <h1>
                                    Uber/Bolt vs Buying Vehicle 
                                    <span className="infoIcon">
                                        <img src={InfoIconImg} alt="info" />
                                        <span className="tooltip">
                                            Compare the total cost of using ride-hailing services versus owning and financing a vehicle including fuel. 
                                        </span>
                                    </span>
                                </h1>

                                <p>
                                    This studio helps you to compare ride-hailing costs against owning a vehicle including finance and fuel.
                                </p>
                            </div>

                            <div className="simulation">

                                <div className="rentingBox">
                                    <h2>Uber/Bolt</h2>

                                    <label>Average Cost per Trip (Going & Returning)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R85"
                                        value={simInputs.uberCostPerTrip}
                                        onChange={(e) => setField("uberCostPerTrip", e.target.value)}
                                    />

                                    <label>Trips per Month</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 30 days"
                                        value={simInputs.uberTripsPerMonth}
                                        onChange={(e) => setField("uberTripsPerMonth", e.target.value)}
                                    />

                                    <label>Years Using Service</label>
                                    <input
                                        type="number"
                                        placeholder="5 YEARS"
                                        value={simInputs.uberYears}
                                        disabled
                                    />
                                </div>

                                <div className="buyingBox">
                                    <h2>Vehicle Ownership</h2>

                                    <label>Vehicle Price (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R350 000"
                                        value={simInputs.carPrice}
                                        onChange={(e) => setField("carPrice", e.target.value)}
                                    />

                                    <label>Monthly Fuel Cost (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R2 000"
                                        value={simInputs.carFuel}
                                        onChange={(e) => setField("carFuel", e.target.value)}
                                    />

                                    <label>Years of Ownership</label>
                                    <input
                                        type="number"
                                        placeholder="5 YEARS"
                                        value={simInputs.carYears}
                                        disabled
                                    />
                                </div>
                            </div>

                            <section className="resultButton">
                                <button className="resultBtn" onClick={handleRunSimulation}>
                                    Run Simulation
                                </button>
                            </section>
                        </div>
                    )}

                    {/* STUDIO 3: Weekly vs Monthly Groceries */}
                    {currentStudio === 2 && (
                        <div className="studio-3">

                            <button className="studioNavBtn" onClick={handleNextStudio}>
                                Studio 3 of 3 →
                            </button>

                            <div className="intro">
                                <h1>
                                    Weekly vs Monthly Groceries
                                    <span className="infoIcon">
                                        <img src={InfoIconImg} alt="info" />
                                        <span className="tooltip">
                                            Compare weekly versus monthly grocery shopping habits.
                                        </span>
                                    </span>
                                </h1>

                                <p>
                                    This studio helps you compare weekly versus monthly grocery shopping. The saving is projected using
                                    7% compound annual growth if the difference is invested monthly.
                                </p>
                            </div>

                            <div className="simulation">

                                <div className="rentingBox">
                                    <h2>Weekly Groceries</h2>

                                    <label>Weekly Grocery Spend (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R750"
                                        value={simInputs.weeklySpend}
                                        onChange={(e) => setField("weeklySpend", e.target.value)}
                                    />

                                    <label>Number of Months</label>
                                    <input
                                        type="number"
                                        placeholder="12 MONTHS"
                                        value={simInputs.weeklyMonths}
                                        disabled
                                    />
                                </div>

                                <div className="buyingBox">
                                    <h2>Monthly Groceries</h2>

                                    <label>Monthly Grocery Budget (R)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. R2 200"
                                        value={simInputs.monthlyBudget}
                                        onChange={(e) => setField("monthlyBudget", e.target.value)}
                                    />

                                    <label>Number of Months</label>
                                    <input
                                        type="number"
                                        placeholder="12 MONTHS"
                                        value={simInputs.monthlyMonths}
                                        disabled
                                    />
                                </div>
                            </div>

                            <section className="resultButton">
                                <button className="resultBtn" onClick={handleRunSimulation}>
                                    Run Simulation
                                </button>
                            </section>
                        </div>
                    )}
                </section>

                {resultsVisible && (
                    <section className="resultsDisplay">
                        <div className="results-Intro">
                            <h1>Simulation Results</h1>
                            <p>Based on your inputs, here is the cost breakdown.</p>
                        </div>

                        <div className="results-container">
                            <div className="result-block">
                                <div className="result-box result-box--filled">
                                    <h2>{formatRand(leftValue)}</h2>
                                </div>
                                <div className="result-label">
                                    <p>Total Cost: {leftLabel}</p>
                                </div>
                            </div>

                            <div className="result-block">
                                <div className="result-box result-box--filled">
                                    <h2>{formatRand(rightValue)}</h2>
                                </div>
                                <div className="result-label">
                                    <p>Total Cost: {rightLabel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="verdictBanner">
                            <p>
                                <strong>{activeResult.cheaper}</strong> is cost-effective option,
                                saving you <strong>{formatRand(Math.abs(activeResult.diff))}</strong> overall.
                            </p>
                        </div>
                    </section>
                )}
            </main>

            {popup && (
                <div className="feedback-overlay" onClick={() => setPopup(null)}>
                    <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>

                        <div className="feedbackTitle">
                            <video
                                src={AnimTipBulb}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="feedbackTitleIcon"
                                style={{ mixBlendMode: "multiply" }}
                            />
                            <h2>{popup.title}</h2>
                        </div>

                        <p className="feedbackMessage healthy">{popup.message}</p>
                        <p className="popupTip">{popup.detail}</p>

                        <button onClick={() => setPopup(null)}>Close</button>
                    </div>
                </div>
            )}
        </Layout>
    );
}