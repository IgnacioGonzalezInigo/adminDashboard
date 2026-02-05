import React from 'react';
import { useApp } from '../context/AppContext';
import KPICard from '../components/KPICard';
import Chart from '../components/Chart';
import { generateAnalyticsData } from '../utils/mockData';

const Dashboard = () => {
    const { kpis } = useApp();
    const analytics = generateAnalyticsData();

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-description">Welcome to your admin dashboard</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <KPICard
                    icon="👥"
                    title="Total Users"
                    value={kpis.totalUsers}
                    trend="up"
                    trendValue="+12%"
                    color="primary"
                />
                <KPICard
                    icon="✅"
                    title="Active Users"
                    value={kpis.activeUsers}
                    trend="up"
                    trendValue="+8%"
                    color="success"
                />
                <KPICard
                    icon="💰"
                    title="Total Revenue"
                    value={`$${kpis.totalRevenue.toLocaleString()}`}
                    trend="up"
                    trendValue="+15%"
                    color="warning"
                />
                <KPICard
                    icon="🔄"
                    title="System Status"
                    value={kpis.systemStatus}
                    color="info"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-2">
                <Chart
                    data={analytics.revenue}
                    type="bar"
                    title="Revenue Trend (Last 6 Months)"
                    height={300}
                />
                <Chart
                    data={analytics.userGrowth}
                    type="line"
                    title="User Growth (Last 6 Months)"
                    height={300}
                />
            </div>
        </div>
    );
};

export default Dashboard;
