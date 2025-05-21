import React, { useState, useEffect, useRef } from 'react';
// Removed: import Chart from 'chart.js/auto';
// Removed: import 'bootstrap/dist/css/bootstrap.min.css';
// Removed: import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const weatherChartRef = useRef(null); // Ref for the canvas element
    const chartInstanceRef = useRef(null); // Ref to hold the Chart.js instance

    // Effect to dynamically load Chart.js and Bootstrap CSS
    useEffect(() => {
        // Load Bootstrap CSS
        const bootstrapLink = document.createElement('link');
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
        bootstrapLink.rel = 'stylesheet';
        document.head.appendChild(bootstrapLink);

        // Load Chart.js
        const chartJsScript = document.createElement('script');
        chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        chartJsScript.onload = () => {
            // Chart.js is loaded, now we can use it
            console.log('Chart.js loaded successfully');
        };
        document.head.appendChild(chartJsScript);

        // Cleanup function to remove the added elements if the component unmounts
        return () => {
            document.head.removeChild(bootstrapLink);
            document.head.removeChild(chartJsScript);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    // Pre-defined list of Indian cities for demonstration
    const indianCities = [
        'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'
    ];

    // Function to generate random weather data
    const generateRandomWeatherData = (cityName) => {
        const forecastData = [];
        const now = new Date();

        for (let i = 0; i < 8; i++) { // Generate 8 forecast points (e.g., every 3 hours for 24 hours)
            const date = new Date(now.getTime() + (i * 3 * 60 * 60 * 1000)); // 3-hour intervals
            const minTemp = 20; // Example minimum temperature
            const maxTemp = 35; // Example maximum temperature
            const temp = Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;

            forecastData.push({
                dt: Math.floor(date.getTime() / 1000), // Unix timestamp
                main: {
                    temp: temp
                }
            });
        }
        return {
            list: forecastData,
            city: {
                name: cityName
            }
        };
    };

    const displayMessage = (text, type = 'info') => {
        setMessage({ text, type });
    };

    const hideMessage = () => {
        setMessage({ text: '', type: '' });
    };

    const fetchWeatherData = async () => {
        hideMessage();
        if (!city) {
            displayMessage('Please enter a city name.', 'error');
            return;
        }

        const normalizedCity = city.toLowerCase();
        const foundCity = indianCities.find(c => c.toLowerCase() === normalizedCity);

        if (!foundCity) {
            displayMessage(`Weather data not available for "${city}". Please try one of these cities: ${indianCities.join(', ')}.`, 'error');
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
            return;
        }

        // Simulate API call delay
        displayMessage('Generating weather data...');
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a network delay

        try {
            // Ensure Chart is available before trying to use it
            if (typeof window.Chart === 'undefined') {
                displayMessage('Chart.js is not loaded yet. Please try again.', 'error');
                return;
            }
            const data = generateRandomWeatherData(foundCity);

            const forecastList = data.list;
            const labels = forecastList.map(item => {
                const date = new Date(item.dt * 1000);
                return date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    day: 'numeric',
                    month: 'short'
                });
            });
            const temperatures = forecastList.map(item => item.main.temp);

            renderChart(labels, temperatures, foundCity);
            hideMessage();
        } catch (error) {
            console.error('Error generating weather:', error);
            displayMessage(`Failed to generate weather data: ${error.message}`, 'error');
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        }
    };

    const renderChart = (labels, data, cityName) => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = weatherChartRef.current.getContext('2d');
        // Use window.Chart as it's loaded globally by the CDN script
        chartInstanceRef.current = new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Temperature (°C) in ${cityName}`,
                    data: data,
                    borderColor: '#4299e1',
                    backgroundColor: 'rgba(66, 153, 225, 0.2)',
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#4299e1',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#4299e1',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#333',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#555', maxRotation: 50, minRotation: 30 }
                    },
                    y: {
                        ticks: { color: '#555' },
                        title: {
                            display: true,
                            text: 'Temperature (°C)',
                            color: '#555'
                        }
                    }
                }
            }
        });
    };

    // Effect to clean up chart instance on component unmount
    useEffect(() => {
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="custom-container" style={{
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f0f2f5'
        }}>
            <h1 className="text-center text-dark fw-bold mb-4">Weather Forecast</h1>

            <div className="d-flex flex-column flex-sm-row gap-3 w-100 max-w-md mb-4">
                <input
                    type="text"
                    id="cityInput"
                    placeholder="Enter city name (e.g., Delhi, Mumbai)"
                    className="form-control flex-grow-1 rounded-md p-3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => { // Allow pressing Enter to fetch weather
                        if (e.key === 'Enter') {
                            fetchWeatherData();
                        }
                    }}
                    style={{ borderRadius: '0.5rem' }}
                />
                <button id="fetchWeatherBtn" className="btn btn-primary fw-bold rounded-md p-3" onClick={fetchWeatherData}
                    style={{
                        backgroundColor: '#4299e1',
                        borderColor: '#4299e1',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease'
                    }}>
                    Get Weather
                </button>
            </div>

            {message.text && (
                <div
                    id="messageBox"
                    className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-warning'} mt-3 w-100 max-w-md rounded-md p-3`}
                    style={{ display: 'block', borderRadius: '0.5rem' }}
                >
                    {message.text}
                </div>
            )}

            <div className="position-relative w-100 max-w-2xl bg-white p-4 rounded-lg shadow-lg" style={{ height: '320px', borderRadius: '0.75rem' }}>
                <canvas id="weatherChart" ref={weatherChartRef}></canvas>
            </div>
        </div>
    );
}

export default App;
