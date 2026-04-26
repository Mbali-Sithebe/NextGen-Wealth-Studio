import React, { useState } from "react";
import Layout from "../components/layout";

//Import Images
import moreButtonImg from "../images/refresh.png"
import propertyImg from "../images/house.png"
import carPurchaseImg from "../images/carPurchase.png"
import groceriesImg from "../images/groceries.png"

export default function SimulationLab(){

    const [currentStudio, setCurrentStudio] = useState(0);

    function handleNextStudio(){
        setCurrentStudio((prev) => (prev + 1) % 3);
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

    {currentStudio === 0 && (
    <div className="studio-1">

      {/*2. Main Button*/}
      <div className="moreButton-Holder">
        <button onClick={handleNextStudio}>
          <img className="more" src={moreButtonImg}/>
        </button>
      </div>

      {/* 1. Top Boc Intro*/}
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
          <input type="number" placeholder="Enter monthly rent" />

          <label>Deposit (R)</label>
          <input type="number" placeholder="Once-off deposit" />

          <label>Years Staying</label>
          <input type="number" placeholder="Number of years" />
        </div>

        {/*Right Tab - Buying*/}
        <div className="buyingBox">
          <h2>Buying Property</h2>

          <label>Monthly Bond (R)</label>
          <input type="number" placeholder="Enter monthly bond" />

          <label>Deposit (R)</label>
          <input type="number" placeholder="Once-off deposit" />

          <label>Years Staying</label>
          <input type="number" placeholder="Number of years" />
        </div>
      </div>

      <section className="resultButton">
        <button className="resultBtn">Run Simulation</button>
      </section>

    </div>
    )}

    {currentStudio === 1 && (
    <div className="studio-2">

      <div className="moreButton-Holder">
        <button onClick={handleNextStudio}>
          <img className="more" src={moreButtonImg}/>
        </button>
      </div>

      <div className="intro">
         <img className="car" src={carPurchaseImg} />
         <h1>Uber vs Vehicle Purchase</h1>
           <p>
        Compare the cost of using ride-hailing services versus owning a vehicle to see which option fits your budget.
          </p>
      </div>

      <div className="simulation">
        {/*Left Tab - Uber*/}
        <div className="rentingBox">
          <h2>Ride-Hailing (Uber/Bolt)</h2>

          <label>Average Cost per Trip (R)</label>
          <input type="number" placeholder="Enter cost per trip" />

          <label>Trips per Month</label>
          <input type="number" placeholder="Number of trips" />

          <label>Years Using Service</label>
          <input type="number" placeholder="Number of years" />
        </div>

        {/*Right Tab - Vehicle*/}
        <div className="buyingBox">
          <h2>Vehicle Ownership</h2>

          <label>Monthly Car Instalment (R)</label>
          <input type="number" placeholder="Enter instalment" />

          <label>Fuel Cost per Month (R)</label>
          <input type="number" placeholder="Estimated fuel cost" />

          <label>Years of Ownership</label>
          <input type="number" placeholder="Number of years" />
        </div>
      </div>

      <section className="resultButton">
        <button className="resultBtn">Run Simulation</button>
      </section>

    </div>
    )}

    {currentStudio === 2 && (
    <div className="studio-3">

      <div className="moreButton-Holder">
        <button onClick={handleNextStudio}>
          <img className="more" src={moreButtonImg}/>
        </button>
      </div>

      <div className="intro">
        <img className="groceries" src={groceriesImg} />
        <h1>Monthly Groceries vs Weekly Groceries</h1>
           <p>
             Explore your grocery spending habits and compare whether shopping weekly or monthly helps you save more.
          </p>

      </div>

      <div className="simulation">
        {/*Left Tab - Weekly*/}
        <div className="rentingBox">
          <h2>Weekly Groceries</h2>

          <label>Weekly Grocery Spend (R)</label>
          <input type="number" placeholder="Enter weekly spend" />

          <label>Weeks per Month</label>
          <input type="number" placeholder="Usually 4" />

          <label>Months</label>
          <input type="number" placeholder="Number of months" />
        </div>

        {/*Right Tab - Monthly*/}
        <div className="buyingBox">
          <h2>Monthly Groceries</h2>

          <label>Monthly Grocery Budget (R)</label>
          <input type="number" placeholder="Enter monthly budget" />

          <label>Extra Spending (R)</label>
          <input type="number" placeholder="Top-ups / unplanned spend" />

          <label>Months</label>
          <input type="number" placeholder="Number of months" />
        </div>
      </div>

      <section className="resultButton">
        <button className="resultBtn">Run Simulation</button>
      </section>

    </div>
    )}

  </section>
  

<section className="resultsDisplay">
  <div className="results-Intro">
    <h1>Simulation Results</h1>
    <p>After a period of 5 years, this is how much you will be saving</p>
  </div>

  {/* Results Container */}
  <div className="results-container">

    {/* LEFT RESULT */}
    <div className="result-block">
      
      <div className="result-box">
        <h2>0%</h2>
      </div>

      <div className="result-label">
        <p>Results for:</p>
      </div>

    </div>

    {/* RIGHT RESULT */}
    <div className="result-block">

      <div className="result-box">
        <h2>0%</h2>
      </div>

      <div className="result-label">
        <p>Results for:</p>
      </div>

    </div>

  </div>

</section>
</main>
         
       </Layout>

    )
}