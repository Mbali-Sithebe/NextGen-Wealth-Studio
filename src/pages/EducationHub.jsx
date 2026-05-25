import React, { useState } from "react";
import Layout from "../components/layout";

import nextButtonImg from "../images/nextButton.svg";
import { glossaryData } from "../data/glossaryData";

export default function EducationHub() {

    const [index, setIndex] = useState(0);

    function handleNext() {
        setIndex((prev) => (prev + 1) % glossaryData.length);
    }

    const templates = [
        {
            id: 1,
            title: "Personal Financial Statement Template",
            description: "Track your personal assets, liabilities, and net worth. Ideal for loan applications and investment planning.",
            file: "/documents/FinancialStatement.xlsx",
            filename: "FinancialStatement.xlsx"
        },
        {
            id: 2,
            title: "3-Year Cash Flow Statement Template",
            description: "Track cash inflows and outflows across multiple periods. Identify trends, monitor liquidity, and assess investment decisions.",
            file: "/documents/CashFlowStatement.xlsx",
            filename: "CashFlowStatement.xlsx"
        },
        {
            id: 3,
            title: "Excel Monthly Profit and Loss Statement Template",
            description: "Track monthly revenue, expenses, and profit with automatic year-to-date totals and visual charts.",
            file: "/documents/MonthlyStatement.xlsx",
            filename: "MonthlyStatement.xlsx"
        },
        {
            id: 4,
            title: "Financial Statement Analysis Template",
            description: "Assess your financial health with sections for ratio analysis, break-even points, and strategic recommendations.",
            file: "/documents/FinancialStatementAnalysis.docx",
            filename: "FinancialStatementAnalysis.docx"
        }
    ];

    return (
        <Layout>
            <header>
                <section className="educationContent">
                    <h1>Education Hub</h1>
                    <p>Welcome to the Education Hub! Here you can find resources to help you grow your financial knowledge.</p>
                </section>
            </header>

            <main className="eduMain">
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
                                    <img className="nextB" src={nextButtonImg} alt="next" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

             
                <section className="eduArticles">
                    <div className="templateOuter">

                        {templates.map((template) => (
                            <div className="templateInner" key={template.id}>
                                <div className="templateText">
                                    <h2 className="templateTitle">{template.title}</h2>
                                    <p className="templateDesc">{template.description}</p>
                                </div>

                                <a
                                    href={template.file}
                                    download={template.filename}
                                    className="downloadBtn"
                                >
                                    Download
                                </a>
                            </div>
                        ))}

                    </div>
                </section>
            </main>
        </Layout>
    );
}