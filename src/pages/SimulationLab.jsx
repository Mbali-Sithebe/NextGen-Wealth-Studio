import React, { useState } from "react";
import Layout from "../components/layout";

//Import Images
import propertyImg from "../images/house.png"
import moreButtonImg from "../images/moreButton.png"
import carPurchaseImg from "../images/carPurchase.png"
import groceriesImg from "../images/groceries.png"

export default function SimulationLab(){

    const [currentStudio, setCurrentStudio] = useState(0);

    function handleNextStudio(){
        setCurrentStudio((prev) => (prev + 1) % 3);
    }

    return(

       <Layout>
        <header>
          <section className="labContent">
            <h1>Simulation Lab</h1>
            <p>
              Let your future unfold by exploring your financial choices with our interactive simulations!
            </p>
          </section>

              {/*2. Main Button*/}
      <div className="moreButton-Holder">
        <button onClick={handleNextStudio}>
          <img className="more" src={moreButtonImg}/>
        </button>
      </div>

        </header>

        <main>
  <section className="interactive-Boxes">

    {/* ================= STUDIO 1 ================= */}
    {currentStudio === 0 && (
    <div className="studio-1">
      {/* 1. Top Boc Intro*/}
      <img className="house" src={propertyImg} />
      <h1>Renting vs Property Purchase</h1>
      <p>
        Use this tool to explore the difference between buying and renting, and see which option could help you save more.
      </p>
   
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
    </div>
    )}


    {/* ================= STUDIO 2 ================= */}
    {currentStudio === 1 && (
    <div className="studio-2">
      <img className="car" src={carPurchaseImg} />
      <h1>Uber vs Vehicle Purchase</h1>
      <p>
        Compare the cost of using ride-hailing services versus owning a vehicle to see which option fits your budget.
      </p>

      {/*Interactive Studio*/}
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
    </div>
    )}


    {/* ================= STUDIO 3 ================= */}
    {currentStudio === 2 && (
    <div className="studio-3">
      <img className="groceries" src={groceriesImg} />
      <h1>Monthly Groceries vs Weekly Groceries</h1>
      <p>
        Explore your grocery spending habits and compare whether shopping weekly or monthly helps you save more.
      </p>

      {/*Interactive Studio*/}
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
    </div>
    )}

    <section className="resultButton">
      <button className="resultBtn">Run Simulation</button>
    </section>

  </section>

  <section className="resultsDisplay">

  </section>
</main>
         
       </Layout>

    )
   
}