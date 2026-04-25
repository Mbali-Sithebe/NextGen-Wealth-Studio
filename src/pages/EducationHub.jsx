import React from "react";
import Layout from "../components/layout";

//Import Images 
import nextButtonImg from "../images/nextButton.png"

export default function EducationHub(){

      //USER INTERFACE DESIGN HERE (For Educational Content)
    return(
        <Layout>
            <header>
                <section className="educationContent">
                  <h1>
                    Education Hub
                  </h1>
                  <p>
                    Learn and grow with Absa NextGen Wealth Studio
                  </p>
                </section>
            </header>

            <main>
                {/*Left Section*/}
                <section className="contentHolders">
                    <div className="glossary">
                        <h1>
                            Glossary
                        </h1>

                        <div className="definations">
                            <h3>SARS</h3>

                            <p>
                                The South African Revenue Service (SARS) is the nation's 
                                official tax-collecting authority, responsible for managing income tax, 
                                customs, and enforcing tax compliance in South Africa.
                            </p>

                            <div className="nextButton">
                                <button>
                                    {/*Put a link here*/}
                                    <img className="nextB" src={nextButtonImg}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Right Section*/}
                <section className="eduArticles">
                    {/*Article 1*/}
                    <div className="article-1">
                        <h1>
                            Understanding Investments
                        </h1>
                        <p>Press here to learn more about investments</p>
                    </div>

                    <div className="readButton">
                                <button>
                                    {/*Put a link here*/}
                                    <img className="nextB" src={nextButtonImg}/>
                                </button>
                    </div>

                    {/*Article 2*/}
                     <div className="article-2">
                        <h1>
                            Learn more about smart budgeting
                        </h1>
                        <p>Press here to learn more about budgeting</p>
                    </div>

                    <div className="readButton">
                                <button>
                                    {/*Put a link here*/}
                                    <img className="nextB" src={nextButtonImg}/>
                                </button>
                    </div>

                    {/*Article 3*/}
                     <div className="article-3">
                        <h1>
                          What is Tax?
                        </h1>
                        <p>Press here to learn more about tax</p>
                    </div>

                    <div className="readButton">
                                <button>
                                    {/*Put a link here*/}
                                    <img className="nextB" src={nextButtonImg}/>
                                </button>
                    </div>

                    {/*Article 4*/}
                     <div className="article-4">
                        <h1>
                            Inflation
                        </h1>
                        <p>Press here to learn more about inflations</p>
                    </div>

                    <div className="readButton">
                                <button>
                                    {/*Put a link here*/}
                                    <img className="nextB" src={nextButtonImg}/>
                                </button>
                    </div>

                </section>

            </main>
          
        </Layout>
    )
    
}