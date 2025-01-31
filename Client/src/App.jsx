import React, { useContext, useEffect, useState } from "react";
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
import Reset from "./Components/Landing/Reset/Reset";
import CourseProgress from "./Components/Dashboard/CourseProgress/CourseProgress";
import CourseAdmin from "./Components/Admin/CourseAdmin/CourseAdmin";
import { UserContext } from "./Context/UserContext";
import DashboardAdmin from "./Components/Admin/DashboardAdmin/DashboardAdmin";
import ProfileAdmin from "./Components/Admin/ProfileAdmin/ProfileAdmin";
import StudentAdmin from "./Components/Admin/StudentAdmin/StudentAdmin";
import QuestionAdmin from "./Components/Admin/CourseAdmin/QuestionAdmin/QuestionAdmin";
import Error404 from "./Components/Error/Error";
function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");
  const { isLoading, setIsLoading } = useLoader();
  const [isVerification, setIsVerification] = useState(false);
  const { pathname } = useLocation();
  const [userRole, setUserRole] = useState();
  const isLoaderVisible = !["/signup", "/verify-email"].includes(pathname);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        >
          <Route path="forgot-password" element={<Forgot />} />
        </Route>
        <Route path="/reset-password/:token" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <Layout>
                {" "}
                <Dashboard />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/answers"
          element={
            <ProtectedRoute role="student">
              <Layout>{<CourseProgress />}</Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedRoute role="student">
              <Layout> {<Course />}</Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
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
            <ProtectedRoute role="student">
              <Layout>
                <Question />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/enrollment"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Enroll />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/quiz"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Quiz />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-users" element={<ManageUsers />} /> */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <DashboardAdmin />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-courses"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <CourseAdmin />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-students"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <StudentAdmin />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <ProfileAdmin />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-course/:courseId/questions"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <QuestionAdmin />
              </Layout>
            </ProtectedRoute>
          }
        />{" "}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
