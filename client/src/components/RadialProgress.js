import React from "react";
import "./RadialProgress.scss"

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"1rem"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

const Text = ({ percentage }) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}
            fontFamily={"inherit"}
        >
            {percentage.toFixed(0)}%
        </text>
    );
};

const RadialProgress = ({ percentage, colour }) => {
    const pct = cleanPercentage(percentage);
    return (
        <div className="progress-bar-radial">
            <svg width="100%" viewBox="0 0 200 200">
                <g transform={`rotate(-90 ${"100 100"})`}>
                    <Circle colour="rgba(255,255,255,0.1)" />
                    <Circle colour="rgba(255,255,255,0.8)" pct={pct} />
                </g>
            </svg>
            <span className="percentage-text">{pct}<span className="percent-symbol">%</span></span>
        </div>

    );
};

export default RadialProgress;
