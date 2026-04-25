import React from "react";
import Layout from "../components/layout";

//Import Images 
import nextButtonImg from "../images/nextButton.png"

export default function EducationHub(){

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
                            <h3>SARS</h3>

                            <p>
                                The South African Revenue Service (SARS) is the nation's 
                                official tax-collecting authority, responsible for managing income tax, 
                                customs, and enforcing tax compliance in South Africa.
                            </p>

                            <div className="nextButton">
                                <a href="#" target="_blank">
                                    <img className="nextB" src={nextButtonImg} alt="next"/>
                                </a>
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
                            <a href="#" target="_blank" className="readButton">
                                <img className="nextB" src={nextButtonImg} />
                            </a>
                        </div>

                        {/*Article 2*/}
                        <div className="articleItem">
                            <h1>Learn more about smart budgeting</h1>
                            <p>Press here to learn more about budgeting</p>
                            <a href="#" target="_blank" className="readButton">
                                <img className="nextB" src={nextButtonImg} />
                            </a>
                        </div>

                        {/*Article 3*/}
                        <div className="articleItem">
                            <h1>What is Tax?</h1>
                            <p>Press here to learn more about tax</p>
                            <a href="#" target="_blank" className="readButton">
                                <img className="nextB" src={nextButtonImg} />
                            </a>
                        </div>

                        {/*Article 4*/}
                        <div className="articleItem">
                            <h1>Inflation</h1>
                            <p>Press here to learn more about inflations</p>
                            <a href="#" target="_blank" className="readButton">
                                <img className="nextB" src={nextButtonImg} />
                            </a>
                        </div>

                    </div>

                </section>

            </main>
          
        </Layout>
    )
}