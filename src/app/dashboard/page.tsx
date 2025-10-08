import React from 'react';

// /Users/paul.ryan/Projects/time-travel-theater/src/app/dashboard/page.tsx


const DashboardPage: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard! Here you can manage your data and view insights.</p>
            <div style={{ marginTop: '20px' }}>
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Action 1</button>
                <button style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>Action 2</button>
            </div>
        </div>
    );
};

export default DashboardPage;