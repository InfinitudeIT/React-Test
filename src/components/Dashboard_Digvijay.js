import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';
import '../styles/Dashboard.css'; // Ensure the correct path for your styles

// Sample data arrays
const lineData = [
  { month: 'Jan', thisEvent: 4000, lastEvent: 2400 },
  { month: 'Feb', thisEvent: 3000, lastEvent: 1398 },
  { month: 'Mar', thisEvent: 2000, lastEvent: 9800 },
  { month: 'Apr', thisEvent: 2780, lastEvent: 3908 },
  { month: 'May', thisEvent: 1890, lastEvent: 4800 },
  { month: 'Jun', thisEvent: 2390, lastEvent: 3800 },
  { month: 'Jul', thisEvent: 3490, lastEvent: 4300 },
];

// Sample data for Pie and Bar charts
const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const barData1 = [
  { name: 'Mobile', value: 2400 },
  { name: 'Desktop', value: 1398 },
  { name: 'Tablet', value: 9800 },
];

const barData2 = [
  { name: 'SEO', value: 4000 },
  { name: 'Marketing', value: 2400 },
  { name: 'Ad Campaigns', value: 1398 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57'];
const smallBarColors = ['#FFBB28', '#FF8042', '#0088FE'];

const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="client-name">
          <h2>Client Name</h2>
        </div>
        <nav className="menu">
          <ul>
            <li>Overview</li>
            <li>Events</li>
            <li>Registrations</li>
            <li>Forms</li>
            <li>Designs</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </header>

        <section className="overview">
          <div className="overview-cards">
            <div className="card">
              <h3>Online Registrations</h3>
              <p>7,265</p>
            </div>
          </div>
        </section>

        <section className="charts">
          {/* Line Chart */}
          <div className="chart-container">
            <h4>Total Users (This Event vs Last Event)</h4>
            <LineChart width={600} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="thisEvent" stroke="#8884d8" />
              <Line type="monotone" dataKey="lastEvent" stroke="#82ca9d" />
            </LineChart>
          </div>

          {/* Pie Chart and Small Bar Chart side by side */}
          <div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ width: '48%' }}>
              <h4>Traffic by Location</h4>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            <div style={{ width: '48%' }}>
              <h4>Traffic by Device</h4>
              <BarChart width={400} height={300} data={props.barData1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {props.barData1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={smallBarColors[index % smallBarColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>

          {/* Large Bar Chart below the Pie and Small Bar Chart */}
          <div className="chart-container" style={{ marginTop: '20px' }}>
            <h4>Marketing & SEO</h4>
            <BarChart width={820} height={400} data={props.barData2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" radius={[10, 10, 0, 0]}>
                {props.barData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;