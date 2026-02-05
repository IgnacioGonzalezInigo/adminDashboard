import React from 'react';
import { useApp } from '../context/AppContext';
import Chart from '../components/Chart';
import { generateAnalyticsData, getCategoryDistribution } from '../utils/mockData';

const Analytics = () => {
    const { products } = useApp();
    const analytics = generateAnalyticsData();
    const categoryData = getCategoryDistribution(products);

    const exportData = () => {
        const dataToExport = {
            revenue: analytics.revenue,
            userGrowth: analytics.userGrowth,
            categoryDistribution: categoryData,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-export-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics</h1>
                    <p className="page-description">Detailed insights and data visualization</p>
                </div>
                <button className="btn btn-primary" onClick={exportData}>
                    📥 Export Data
                </button>
            </div>

            <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <Chart
                    data={analytics.revenue}
                    type="bar"
                    title="Monthly Revenue"
                    height={320}
                />
                <Chart
                    data={analytics.userGrowth}
                    type="line"
                    title="User Growth Trend"
                    height={320}
                />
            </div>

            <div className="grid grid-2">
                <Chart
                    data={categoryData}
                    type="bar"
                    title="Products by Category"
                    height={320}
                />
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Summary Statistics</h3>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <div className="text-sm text-muted">Total Revenue (6 months)</div>
                                <div className="text-xl" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    ${analytics.revenue.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted">Average Monthly Revenue</div>
                                <div className="text-xl" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    ${Math.floor(analytics.revenue.reduce((sum, item) => sum + item.value, 0) / analytics.revenue.length).toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted">Total User Growth (6 months)</div>
                                <div className="text-xl" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {analytics.userGrowth.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted">Product Categories</div>
                                <div className="text-xl" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {categoryData.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
