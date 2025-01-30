import React, { useEffect, useState } from "react";
import "./StudentAdmin.css";
import axios from "axios";
import moment from "moment";
import { useLoader } from "../../../Context/LoaderContext";

const StudentAdmin = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://complex-giant-need.glitch.me/api/students`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStudents(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getStudents();
  }, []);

  return (
    <div className="students">
      <h2>All Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                {" "}
                {student.lastLogin
                  ? moment(student.lastLogin).format("YYYY-MM-DD HH:mm:ss")
                  : "Never Logged in"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAdmin;
