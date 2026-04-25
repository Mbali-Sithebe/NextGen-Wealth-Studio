import React, { useState } from "react";
import Layout from "../components/layout";

//Image Import (Icons)
import milestoneImg from "../images/milestone.png";
import tickButtonImg from "../images/circleButton.png";

import { strategyData } from "../data/strategyData";

export default function StrategyTracks () {

    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState([]);

    const totalTasks = 12; // 5 boxes × 3 tasks each

    function handleTick(id) {
        if (completed.includes(id)) return;

        const updated = [...completed, id];
        setCompleted(updated);
        setProgress(Math.round((updated.length / totalTasks) * 100));
    }

    return(
        <Layout>
            <header>
                <section className="pageIntro">
                    <h1 className="pageTitle">
                        Strategy Tracker
                    </h1>

                    {/* FIXED: paragraph now sits next to icon */}
                    <div className="introRow">
                        <img className="progress" src={milestoneImg} alt="Progress" />
                        <p>
                            Track your progress milestones and financial strategy set for the next 5 years.
                        </p>
                    </div>
                </section>

                {/* RED BOX PROGRESS SECTION */}
                <section className="mainSlider-Progress">
                    <div className="sliderContainer">
                        <h1 className="slider-Progress">
                            Progress: {progress}% Completed
                        </h1>

                        {/* FUNCTIONAL SLIDER */}
                        <div className="progressSlider">
                            <div 
                                className="progressFill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </section>
            </header>

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
            </main>
        </Layout>
    )
}