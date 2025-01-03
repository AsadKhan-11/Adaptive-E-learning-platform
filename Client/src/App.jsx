import { useEffect, useState } from "react";
import Login from "./Components/Landing/Login";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Course from "./Components/Course/Course";
import Question from "./Components/Questiom/Question";
import Level from "./Components/Course/Level/Level";
import Profile from "./Components/Profile/Profile";
import Dashboard from "./Components/Dashboard/Dashboard";
import Select from "./Components/Course/Level/Select/Select";
import Videos from "./Components/Course/Level/Select/Videos/Videos";
import Quiz from "./Components/Quiz/Quiz";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import RingLoader from "react-spinners/RingLoader";
import Enroll from "./Components/Course/Enrollment/Enroll";
import Forgot from "./Components/Forgot/Forgot";
import { useLoader } from "./Context/LoaderContext";
import Loader from "./Components/Loader/Loader";
function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");
  const { isLoading, setIsLoading } = useLoader();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    setNavText(token ? "Logout" : "Signup");

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div className="App">
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <Navbar
        navText={navText}
        setNavText={setNavText}
        setIsFlipped={setIsFlipped}
        isFlipped={isFlipped}
      />
      <Routes>
        <Route path="/" element={<Login isFlipped={isFlipped} />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <Course />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <Profile />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/question"
          element={
            <ProtectedRoute>
              <Layout>
                <Question />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/enrollment"
          element={
            <ProtectedRoute>
              <Layout>
                <Enroll />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/quiz"
          element={
            <ProtectedRoute>
              <Layout>
                <Quiz />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
