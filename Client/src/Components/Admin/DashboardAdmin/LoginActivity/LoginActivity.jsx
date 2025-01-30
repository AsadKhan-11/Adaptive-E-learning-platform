import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "./LoginActivity.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLoader } from "../../../../Context/LoaderContext";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LoginGraph = () => {
  const [data, setData] = useState([]);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://complex-giant-need.glitch.me/api/logins-per-day"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching login data", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginData();
  }, []);

  // Prepare the data for the chart
  const chartData = {
    labels: data.map((entry) => entry._id), // Extracting the date (e.g., "2025-01-01")
    datasets: [
      {
        label: "Logins per Day",
        data: data.map((entry) => entry.count), // Extracting the login count
        fill: false,
        borderColor: "#0d47a1", // Line color
        tension: 0.1, // Curvy line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {},
    scales: {
      x: {
        ticks: {
          color: "#222",
          autoSkip: false, // Ensure ticks are always shown
          maxRotation: 45, // Prevent labels from overlapping
          minRotation: 45,
        },
      },
      y: {
        ticks: {
          color: "#222",
        },
        beginAtZero: true,
        suggestedMin: 0, // Ensures empty graphs still have a scale
        suggestedMax: Math.max(...data.map((entry) => entry.count), 10), // Prevents too small Y-axis
      },
    },
  };

  return (
    <div className="login-activity">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LoginGraph;
