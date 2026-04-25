import React, { useState } from "react";
import Layout from "../components/layout";

//Image Import (Icons)
import milestoneImg from "../images/milestone.png";
import tickButtonImg from "../images/circleButton.png";

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

                    {/* BOX 1 */}
                    <div className="goalWrapper">
                        <div className="goalBox">
                            <div className="boxHeader">Property Tracker</div>
                            <div className="boxContent">

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(1)}
                                        className={`tickBox ${completed.includes(1) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Save enough money for a deposit.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(2)}
                                        className={`tickBox ${completed.includes(2) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Build a strong credit score.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(3)}
                                        className={`tickBox ${completed.includes(3) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Reduce existing debt.</p>
                                </div>

                            </div>
                        </div>
                        <button className="yearLabel">Year 1</button>
                    </div>

                    {/* BOX 2 */}
                    <div className="goalWrapper">
                        <div className="goalBox">
                            <div className="boxHeader">Vehicle Tracker</div>
                            <div className="boxContent">

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(4)}
                                        className={`tickBox ${completed.includes(4) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Save for car deposit.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(5)}
                                        className={`tickBox ${completed.includes(5) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Compare vehicle options.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(6)}
                                        className={`tickBox ${completed.includes(6) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Plan monthly instalments.</p>
                                </div>

                            </div>
                        </div>
                        <button className="yearLabel">Year 2</button>
                    </div>

                    {/* BOX 3 */}
                    <div className="goalWrapper">
                        <div className="goalBox">
                            <div className="boxHeader">Investment Tracker</div>
                            <div className="boxContent">

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(7)}
                                        className={`tickBox ${completed.includes(7) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Start investing small amounts.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(8)}
                                        className={`tickBox ${completed.includes(8) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Diversify income streams.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(9)}
                                        className={`tickBox ${completed.includes(9) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Track portfolio growth.</p>
                                </div>

                            </div>
                        </div>
                        <button className="yearLabel">Year 3</button>
                    </div>

                    {/* BOX 4 */}
                    <div className="goalWrapper">
                        <div className="goalBox">
                            <div className="boxHeader">Balanced Lifestyle</div>
                            <div className="boxContent">

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(10)}
                                        className={`tickBox ${completed.includes(10) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Maintain healthy spending habits.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(11)}
                                        className={`tickBox ${completed.includes(11) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Save for leisure and travel.</p>
                                </div>

                                <div className="taskRow">
                                    <button
                                        onClick={() => handleTick(12)}
                                        className={`tickBox ${completed.includes(12) ? "done" : ""}`}
                                    >
                                        <img src={tickButtonImg} alt="tick" />
                                    </button>
                                    <p>Build an emergency fund.</p>
                                </div>

                            </div>
                        </div>
                        <button className="yearLabel">Year 4</button>
                    </div>

                </section>
            </main>
        </Layout>
    )
}