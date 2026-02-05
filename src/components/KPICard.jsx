import React, { useEffect, useState } from 'react';
import './KPICard.css';

const KPICard = ({ icon, title, value, trend, trendValue, color = 'primary' }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        // Animate the counter
        const isNumber = typeof value === 'number';
        if (!isNumber) return;

        const duration = 1000;
        const steps = 30;
        const stepValue = value / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setAnimatedValue(Math.floor(stepValue * currentStep));

            if (currentStep >= steps) {
                setAnimatedValue(value);
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    const displayValue = typeof value === 'number' ? animatedValue : value;

    return (
        <div className={`kpi-card kpi-card-${color}`}>
            <div className="kpi-icon">{icon}</div>
            <div className="kpi-content">
                <div className="kpi-title">{title}</div>
                <div className="kpi-value">
                    {typeof value === 'number' && value > 999
                        ? displayValue.toLocaleString()
                        : displayValue}
                </div>
                {trend && (
                    <div className={`kpi-trend kpi-trend-${trend}`}>
                        <span className="trend-icon">{trend === 'up' ? '↑' : '↓'}</span>
                        <span className="trend-value">{trendValue}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KPICard;
