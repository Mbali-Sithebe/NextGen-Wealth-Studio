import React, { useState } from "react";
import Layout from "../components/layout";

import propertyImg from "../images/house.png"

export default function SimulationLab(){

    // Studio 1 - Renting inputs
    const [rentMonthly, setRentMonthly] = useState("");
    const [rentDeposit, setRentDeposit] = useState("");
    const [rentYears, setRentYears] = useState("");

    // Studio 1 - Buying inputs
    const [buyBond, setBuyBond] = useState("");
    const [buyDeposit, setBuyDeposit] = useState("");
    const [buyYears, setBuyYears] = useState("");

    // Studio 1 - Results
    const [rentingResult, setRentingResult] = useState("0%");
    const [buyingResult, setBuyingResult] = useState("0%");
    const [rentingLabel, setRentingLabel] = useState("Results for:");
    const [buyingLabel, setBuyingLabel] = useState("Results for:");
    const [simRan, setSimRan] = useState(false);

    // Studio 1 - Run Simulation logic
    function handleRunSimulation(){
        const monthlyRent = parseFloat(rentMonthly) || 0;
        const depositRent = parseFloat(rentDeposit) || 0;
        const yearsRent   = parseFloat(rentYears)   || 0;

        const monthlyBond = parseFloat(buyBond)     || 0;
        const depositBuy  = parseFloat(buyDeposit)  || 0;
        const yearsBuy    = parseFloat(buyYears)     || 0;

        const totalRenting = (monthlyRent * yearsRent * 12) + depositRent;
        const totalBuying  = (monthlyBond * yearsBuy  * 12) + depositBuy;
        const combined     = totalRenting + totalBuying;

        if (combined === 0) return;

        const rentPercent = ((totalRenting / combined) * 100).toFixed(1);
        const buyPercent  = ((totalBuying  / combined) * 100).toFixed(1);

        setRentingResult(`${rentPercent}%`);
        setBuyingResult(`${buyPercent}%`);
        setRentingLabel("Results for: Renting");
        setBuyingLabel("Results for: Buying Property");
        setSimRan(true);
    }

    return(
      //UI Elements Starts Here:
       <Layout>
        <header>
          <section className="labContent">
            <h1>Simulation Lab</h1>
            <p>
              Let your future unfold by exploring your financial choices with our interactive simulations!
            </p>
          </section>
        </header>

        <main>
  <section className="interactive-Boxes">

    <div className="studio-1">

      {/* 1. Top Box Intro*/}
      <div className="intro">
         <img className="house" src={propertyImg} />
         <h1>Renting vs Property Purchase</h1>
            <p>
              Use this tool to explore the difference between buying and renting, and see which option could help you save more.
           </p>
      </div>
    
      <div className="simulation">
        {/*Left Tab - Renting*/}
        <div className="rentingBox">
          <h2>Renting</h2>

          <label>Monthly Rent (R)</label>
          <input
            type="number"
            placeholder="Enter monthly rent"
            value={rentMonthly}
            onChange={(e) => setRentMonthly(e.target.value)}
          />

          <label>Deposit (R)</label>
          <input
            type="number"
            placeholder="Once-off deposit"
            value={rentDeposit}
            onChange={(e) => setRentDeposit(e.target.value)}
          />

          <label>Years Staying</label>
          <input
            type="number"
            placeholder="Number of years"
            value={rentYears}
            onChange={(e) => setRentYears(e.target.value)}
          />
        </div>

        {/*Right Tab - Buying*/}
        <div className="buyingBox">
          <h2>Buying Property</h2>

          <label>Monthly Bond (R)</label>
          <input
            type="number"
            placeholder="Enter monthly bond"
            value={buyBond}
            onChange={(e) => setBuyBond(e.target.value)}
          />

          <label>Deposit (R)</label>
          <input
            type="number"
            placeholder="Once-off deposit"
            value={buyDeposit}
            onChange={(e) => setBuyDeposit(e.target.value)}
          />

          <label>Years Staying</label>
          <input
            type="number"
            placeholder="Number of years"
            value={buyYears}
            onChange={(e) => setBuyYears(e.target.value)}
          />
        </div>
      </div>

      <section className="resultButton">
        <button className="resultBtn" onClick={handleRunSimulation}>Run Simulation</button>
      </section>

    </div>

  </section>


  <section className="resultsDisplay">
    <div className="results-Intro">
      <h1>Simulation Results</h1>

      {/* Only shows after Run Simulation is pressed */}
      {simRan && (
          <p>
              Over a period of {rentYears} years, you will spend more on renting and save more with buying.
          </p>
      )}
    </div>

    {/* Results Container */}
    <div className="results-container">

      {/* Left Results */}
      <div className="result-block">
        <div className="result-box">
          <h2>{rentingResult}</h2>
        </div>
        <div className="result-label">
          <p>{rentingLabel}</p>
        </div>
      </div>

      {/* Right Results */}
      <div className="result-block">
        <div className="result-box">
          <h2>{buyingResult}</h2>
        </div>
        <div className="result-label">
          <p>{buyingLabel}</p>
        </div>
      </div>

    </div>
  </section>
</main>
       </Layout>
    )
}