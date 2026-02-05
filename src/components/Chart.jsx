import React, { useRef, useEffect } from 'react';
import './Chart.css';

const Chart = ({ data, type = 'bar', title, height = 300 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data || data.length === 0) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set canvas size accounting for device pixel ratio
        canvas.width = rect.width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, height);

        // Get computed styles for theme colors
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryColor = computedStyle.getPropertyValue('--primary-500').trim();
        const textColor = computedStyle.getPropertyValue('--text-secondary').trim();
        const borderColor = computedStyle.getPropertyValue('--border-light').trim();

        // Chart dimensions
        const padding = 40;
        const chartWidth = rect.width - padding * 2;
        const chartHeight = height - padding * 2;

        // Find max value
        const maxValue = Math.max(...data.map(d => d.value));
        const roundedMax = Math.ceil(maxValue / 10) * 10;

        if (type === 'bar') {
            drawBarChart(ctx, data, chartWidth, chartHeight, padding, roundedMax, primaryColor, textColor, borderColor);
        } else if (type === 'line') {
            drawLineChart(ctx, data, chartWidth, chartHeight, padding, roundedMax, primaryColor, textColor, borderColor);
        }
    }, [data, type, height]);

    const drawBarChart = (ctx, data, width, height, padding, maxValue, primaryColor, textColor, borderColor) => {
        const barWidth = width / data.length - 10;
        const barGap = 10;

        // Draw Y-axis grid lines
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + width, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = textColor;
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxValue - (maxValue / 5) * i).toLocaleString(), padding - 10, y + 4);
        }

        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * height;
            const x = padding + index * (barWidth + barGap);
            const y = padding + height - barHeight;

            // Create gradient for bar
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, primaryColor);
            // Convert HSL to HSLA with alpha
            const alphaColor = primaryColor.replace('hsl(', 'hsla(').replace(')', ', 0.5)');
            gradient.addColorStop(1, alphaColor);

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);

            // X-axis labels
            ctx.fillStyle = textColor;
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.month || item.category, x + barWidth / 2, padding + height + 20);
        });
    };

    const drawLineChart = (ctx, data, width, height, padding, maxValue, primaryColor, textColor, borderColor) => {
        const pointGap = width / (data.length - 1);

        // Draw Y-axis grid lines
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + width, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = textColor;
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxValue - (maxValue / 5) * i).toLocaleString(), padding - 10, y + 4);
        }

        // Draw line
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();

        data.forEach((item, index) => {
            const x = padding + index * pointGap;
            const y = padding + height - (item.value / maxValue) * height;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw area under line
        ctx.lineTo(padding + width, padding + height);
        ctx.lineTo(padding, padding + height);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
        // Convert HSL to HSLA with alpha
        const alphaColorStart = primaryColor.replace('hsl(', 'hsla(').replace(')', ', 0.25)');
        const alphaColorEnd = primaryColor.replace('hsl(', 'hsla(').replace(')', ', 0)');
        gradient.addColorStop(0, alphaColorStart);
        gradient.addColorStop(1, alphaColorEnd);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw points
        data.forEach((item, index) => {
            const x = padding + index * pointGap;
            const y = padding + height - (item.value / maxValue) * height;

            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // X-axis labels
            ctx.fillStyle = textColor;
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.month || item.category, x, padding + height + 20);
        });
    };

    return (
        <div className="chart-container">
            {title && <h4 className="chart-title">{title}</h4>}
            <canvas ref={canvasRef} style={{ width: '100%', height: `${height}px` }} />
        </div>
    );
};

export default Chart;
