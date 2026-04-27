import React, { useState } from "react";
import Layout from "../components/layout";

//Import Images 
import nextButtonImg from "../images/nextButton.png"

//Import Data
import { glossaryData } from "../data/glossaryData";

export default function EducationHub(){

    const [index, setIndex] = useState(0);

    function handleNext() {
        setIndex((prev) => (prev + 1) % glossaryData.length);
    }

    return(
        <Layout>
            <header>
                <section className="educationContent">
                  <h1>Education Hub</h1>
                  <p>Learn and grow with Absa NextGen Wealth Studio</p>
                </section>
            </header>

            <main className="eduMain">

                {/*Left Section*/}
                <section className="contentHolders">
                    <div className="glossary">
                        <h1 className="glossaryTitle">Glossary</h1>

                        <div className="definations">
                            <h3>{glossaryData[index].term}</h3>

                            <p>
                                {glossaryData[index].definition}
                            </p>

                            <div className="nextButton">
                                <button onClick={handleNext}>
                                    <img className="nextB" src={nextButtonImg} alt="next"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Right Section*/}
                <section className="eduArticles">

                    <div className="articleBox">

                        {/*Article 1*/}
                        <div className="articleItem">
                            <h1>Understanding Investments</h1>
                            <p>Press here to learn more about investments</p>
                            <a 
                                href="https://www.ebsco.com/research-starters/business-and-management/understanding-investing" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="readButton"
                                title="Opens in a new tab"
                            >
                                <img className="nextB" src={nextButtonImg} alt="read"/>
                            </a>
                        </div>

                        {/*Article 2*/}
                        <div className="articleItem">
                            <h1>Learn more about smart budgeting</h1>
                            <p>Press here to learn more about budgeting</p>
                            <a 
                                href="https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="readButton"
                                title="Opens in a new tab"
                            >
                                <img className="nextB" src={nextButtonImg} alt="read"/>
                            </a>
                        </div>

                        {/*Article 3*/}
                        <div className="articleItem">
                            <h1>What is Tax?</h1>
                            <p>Press here to learn more about tax</p>
                            <a 
                                href="https://www.investopedia.com/terms/t/taxation.asp" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="readButton"
                                title="Opens in a new tab"
                            >
                                <img className="nextB" src={nextButtonImg} alt="read"/>
                            </a>
                        </div>

                        {/*Article 4*/}
                        <div className="articleItem">
                            <h1>Inflation</h1>
                            <p>Press here to learn more about inflations</p>
                            <a 
                                href="https://www.statssa.gov.za/?cat=33" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="readButton"
                                title="Opens in a new tab"
                            >
                                <img className="nextB" src={nextButtonImg} alt="read"/>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}