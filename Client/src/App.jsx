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
import Verification from "./Components/Landing/Verification/Verification";
import Forgot from "./Components/Forgot/Forgot";
import { useLoader } from "./Context/LoaderContext";
import Loader from "./Components/Loader/Loader";
function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");
  const { isLoading, setIsLoading } = useLoader();
  const [isVerification, setIsVerification] = useState(false);
  const { pathname } = useLocation();

  const isLoaderVisible = ![
    "/",
    "/signup",
    "/forgot-password",
    "/verify-email",
  ].includes(pathname);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    setNavText(token ? "Logout" : "Signup");

    if (isLoaderVisible) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, setIsLoading, isLoaderVisible]);

  return (
    <div className="App">
      {isLoading && isLoaderVisible && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <Navbar
        navText={navText}
        setNavText={setNavText}
        setIsFlipped={setIsFlipped}
        isFlipped={isFlipped}
        isVerification={isVerification}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              isVerification={isVerification}
              setIsVerification={setIsVerification}
              setNavText={setNavText}
            />
          }
        />
        {/* <Route
          path="/verify-email"
          element={
            <Verification setNavText={setNavText} setIsFlipped={setIsFlipped} />
          }
        /> */}

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
