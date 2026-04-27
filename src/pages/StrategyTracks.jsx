import React, { useState } from "react";
import Layout from "../components/layout";

//Image Import (Icons)
import milestoneImg from "../images/milestone.png";
import tickButtonImg from "../images/circleButton.png";
import TipsImg from "../images/SmileyOne.png"
import TipsIconImg from "../images/tips.png"

import { strategyData } from "../data/strategyData";

export default function StrategyTracks () {

    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState([]);
    
    // 4 Boxes: Each Box Has 3 Goals (Progress Slider no longer apply this)
    const totalTasks = 12; 

    function handleTick(id) {
        if (completed.includes(id)) return;

        const updated = [...completed, id];
        setCompleted(updated);
        setProgress(Math.round((updated.length / totalTasks) * 100));
    }

    // Year Progress for Bar Graph
    const getYearProgress = (tasks) => {
        const done = tasks.filter(t => completed.includes(t.id)).length;
        return Math.round((done / tasks.length) * 100);
    };

    //USER INTERFACE DESIGN HERE (4 USER MILESTONES: 4 YEARS: PROGRESS TRACKER:)
    return(
        <Layout>
            <header>
                <section className="pageIntro">
                    <h1 className="pageTitle">
                        Strategy Tracker
                    </h1>

                    <div className="introRow">
                        <img className="progress" src={milestoneImg} alt="Progress" />
                        <p>
                            Track your progress milestones and financial strategy set for the next four years.
                        </p>
                    </div>
                </section>

                {/* Main Slider */}
                <section className="mainSlider-Progress">
                    <div className="sliderContainer">
                        <h1 className="slider-Progress">
                            Progress: {progress}% Completed
                        </h1>

                        <div className="progressSlider">
                            <div 
                                className="progressFill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </section>
            </header>

            {/* Milestones - 4 Year */}
            <main>
                <section className="milestone-Boxes">

                    {strategyData.map((box) => (
                        <div className="goalWrapper" key={box.title}>
                            <div className="goalBox">

                                <div className="boxHeader">{box.title}</div>

                                <div className="boxContent">

                                    {box.tasks.map((task) => (
                                        <div className="taskRow" key={task.id}>
                                            <button
                                                onClick={() => handleTick(task.id)}
                                                className={`tickBox ${completed.includes(task.id) ? "done" : ""}`}
                                            >
                                                <img src={tickButtonImg} alt="tick" />
                                            </button>

                                            <p>{task.text}</p>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <button className="yearLabel">{box.year}</button>
                        </div>
                    ))}

                </section>

               
                <section className="dashboardBottom">

                    {/* Bar Graph Generate (Left) */}
                    <div className="trackData">
                        <div className="barGraph-Container">
                            <h1 className="dataTitle">
                                Progress Tracker Data
                            </h1>
                            <p className="text">This is yearly progress data tracking how much you have saved over the course of a year</p>

                            {strategyData.map((box) => (
                                <div key={box.year} className="barRow">
                                    <p>{box.year}</p>

                                    <div className="bar">
                                        <div
                                            className="barFill"
                                            style={{ width: `${getYearProgress(box.tasks)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generate Tips (Right) */}
                    <div className="TipsContainer-Holder">

                        <div className="TipsBox">
                             
                            <h1 className="tipsTitle">
                                <img className="tips" src={TipsIconImg} />
                                General Tips
                            </h1>

                            <div className="Tip-1">
                                <img className="smiley" src={TipsImg} />
                                <p>Set aside your savings the moment your income arrives.</p>
                            </div>

                            <div className="Tip-2">
                                <img className="smiley" src={TipsImg} />
                                <p>Know where your money goes helps you cut what doesn't matter.</p>
                            </div>

                            <div className="Tip-3">
                                <img className="smiley" src={TipsImg} />
                                <p>Avoid impulse buying, wait 24 hours before making any unplanned purchase.</p>
                            </div>

                             <div className="Tip-4">
                                <img className="smiley" src={TipsImg} />
                                <p>cancel any service you haven't used in the past month</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}