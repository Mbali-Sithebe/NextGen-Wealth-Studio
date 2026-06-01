import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import AuthContext from "../context/AuthContext";

import AnimTipBulb from "../images/AnimTipBulb.mp4";
import SmileyIcon from "../images/SmileyIcon.mp4";
import InfoIconImg from "../images/info.png"; 

import { tracks, stateLabels, stateColors, popupMessages } from "../data/strategyData";

export default function StrategyTracks() {
    const { selectedTrack, trackProgress, chooseTrack, updateMilestoneState } = useContext(AuthContext);

    const [popup, setPopup] = useState(null);

    const activeTrack = tracks.find(t => t.id === selectedTrack) || null;

    function getMilestoneState(id) {
        return trackProgress[id] ?? 0;
    }

    function handleMilestoneClick(milestoneId, yearIndex, yearMilestones) {
        const current = getMilestoneState(milestoneId);
        const next = (current + 1) % 3;
        updateMilestoneState(milestoneId, next);

        // Popup when milestone is reached
        if (next === 2) {
            const allDone = yearMilestones.every(m => {
                const s = m.id === milestoneId ? 2 : getMilestoneState(m.id);
                return s === 2;
            });
            if (allDone) {
                setPopup(popupMessages[yearIndex]);
            }
        }
    }

    // Track progress percentage
    function getOverallProgress() {
        if (!activeTrack) return 0;
        const allMilestones = activeTrack.years.flatMap(y => y.milestones);
        const done = allMilestones.filter(m => getMilestoneState(m.id) === 2).length;
        return Math.round((done / allMilestones.length) * 100);
    }

    // Per-year progress percentage for bar graph
    function getYearProgress(milestones) {
        const done = milestones.filter(m => getMilestoneState(m.id) === 2).length;
        return Math.round((done / milestones.length) * 100);
    }

    // Track Selection Studios
    if (!selectedTrack) {
        return (
            <Layout>
                <header>
                    <section className="pageIntro">
                        <h1 className="pageTitle">Strategy Tracker</h1>
                        <div className="introRow">
                            <p>
                                This page offers three financial trackers. Select the one that best suits your goals
                                and lifestyle for the next four years.
                            </p>
                        </div>
                    </section>
                </header>

                <main>
                    <div className="trackSelection">
                        {tracks.map(track => (
                            <div key={track.id} className="trackCard">
                                <h2 className="trackCardName">{track.name}</h2>
                                <p className="trackCardTagline">{track.tagline}</p>

                                <div className="trackCardSection">
                                    <span className="trackCardLabel">Designed For:</span>
                                    <p>{track.who}</p>
                                </div>

                                <div className="trackCardSection">
                                    <span className="trackCardLabel">Requirements:</span>
                                    <p>{track.cost}</p>
                                </div>

                                <button
                                    className="selectTrackBtn"
                                    onClick={() => chooseTrack(track.id)}
                                >
                                    Choose This Track
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </Layout>
        );
    }

    // Active Track Screen
    return (
        <Layout>
            <header>
                <section className="pageIntro">
                    <h1 className="pageTitle">{activeTrack.name}</h1>
                    <div className="introRow">
                        <p>Track your financial milestones and long-term strategy over the next four years. Set goals, monitor your progress, and stay aligned with your financial plan
                            as you build toward your future targets.</p>
                    </div>

                    <button
                        className="switchTrackBtn"
                        onClick={() => chooseTrack(null)}
                    >
                        ← Switch Track
                    </button>
                </section>

                {/* Overall Progress Slider */}
                <section className="mainSlider-Progress">
                    <div className="sliderContainer">
                        <h1 className="slider-Progress">
                            Overall Progress: {getOverallProgress()}% Completed

                            <span className="infoIcon">
                                <img src={InfoIconImg} alt="info" />
                                <span className="tooltip">
                                    This shows your total completion across all milestones in your selected track.
                                </span>
                            </span>
                        </h1>
                        <div className="progressSlider">
                            <div
                                className="progressFill"
                                style={{ width: `${getOverallProgress()}%` }}
                            />
                        </div>
                    </div>
                </section>
            </header>

            <main>
                {/* 4 Milestone Year Boxes */}
                <section className="milestone-Boxes">
                    {activeTrack.years.map((yearObj, yearIndex) => (
                        <div className="goalWrapper" key={yearObj.year}>
                            <div className="goalBox">
                                <div className="boxHeader">{yearObj.title}</div>
                                <div className="boxContent">
                                    {yearObj.milestones.map((task) => {
                                        const state = getMilestoneState(task.id);
                                        return (
                                            <div className="taskRow" key={task.id}>

                                                {/* 3-state dot buttons */}
                                                <div className="milestoneBtnWrapper">
                                                    <button
                                                        onClick={() => handleMilestoneClick(task.id, yearIndex, yearObj.milestones)}
                                                        className="milestoneBtn"
                                                        style={{ backgroundColor: stateColors[state] }}
                                                    />
                                                    {/* Tooltip */}
                                                    <span className="milestoneTooltip">
                                                        {stateLabels[state]}
                                                    </span>
                                                </div>

                                                <p style={{
                                                    textDecoration: state === 2 ? "line-through" : "none",
                                                    color: state === 2 ? "#aaa" : "#2D2323"
                                                }}>
                                                    {task.text}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button className="yearLabel">{yearObj.year}</button>
                        </div>
                    ))}
                </section>

                <section className="dashboardBottom">

                    {/* Bar Graph (Left) */}
                    <div className="trackData">
                        <div className="barGraph-Container">
                            <h1 className="dataTitle">
                                Progress Tracker Data
                                <span className="infoIcon">
                                    <img src={InfoIconImg} alt="info" />
                                    <span className="tooltip">
                                        This section shows your yearly milestone completion and overall progress across your selected track.
                                    </span>
                                </span>
                            </h1>

                            <p className="text">
                                Yearly milestone completion for your {activeTrack.name} track.
                            </p>

                            {activeTrack.years.map((yearObj) => (
                                <div key={yearObj.year} className="barRow">
                                    <div className="barRowLabel">
                                        <p>{yearObj.year}</p>
                                        <p>{getYearProgress(yearObj.milestones)}%</p>
                                    </div>
                                    <div className="bar">
                                        <div
                                            className="barFill"
                                            style={{ width: `${getYearProgress(yearObj.milestones)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips Box (Right) */}
                    <div className="TipsContainer-Holder">
                        <div className="TipsBox">
                            <h1 className="tipsTitle">
                                General Tips
                                <span className="infoIcon">
                                    <img src={InfoIconImg} alt="info" />
                                    <span className="tooltip">
                                        These tips help you stay consistent, disciplined, and aligned with your long-term financial goals.
                                    </span>
                                </span>
                            </h1>

                            <div className="Tip-1">
                                <video src={SmileyIcon} autoPlay loop muted playsInline className="smiley" style={{ mixBlendMode: "multiply" }} />
                                <p>Set aside your savings the moment your income arrives.</p>
                            </div>
                            <div className="Tip-2">
                                <video src={SmileyIcon} autoPlay loop muted playsInline className="smiley" style={{ mixBlendMode: "multiply" }} />
                                <p>Tracking where your money goes helps you cut what does not matter.</p>
                            </div>
                            <div className="Tip-3">
                                <video src={SmileyIcon} autoPlay loop muted playsInline className="smiley" style={{ mixBlendMode: "multiply" }} />
                                <p>Wait 24 hours before any unplanned purchase, impulse buying kills budgets.</p>
                            </div>
                            <div className="Tip-4">
                                <video src={SmileyIcon} autoPlay loop muted playsInline className="smiley" style={{ mixBlendMode: "multiply" }} />
                                <p>Cancel any subscription you have not used in the past 30 days.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {popup && (
                <div className="feedback-overlay" onClick={() => setPopup(null)}>
                    <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>

                        <div className="feedbackTitle">
                            <video
                                src={AnimTipBulb}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="feedbackTitleIcon"
                                style={{ mixBlendMode: "multiply" }}
                            />
                            <h2>{popup.title}</h2>
                        </div>

                        <p className="feedbackMessage healthy">{popup.message}</p>
                        <p className="popupTip">{popup.tip}</p>

                        <button onClick={() => setPopup(null)}>Continue</button>

                    </div>
                </div>
            )}
        </Layout>
    );
}