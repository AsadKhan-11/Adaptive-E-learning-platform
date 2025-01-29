import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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
          "http://localhost:3000/api/logins-per-day"
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
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1, // Curvy line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Login Activity Over Time",
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LoginGraph;
