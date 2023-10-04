/* eslint-disable no-unused-vars */
import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Student from "./pages/HomePages/Student";
import TeachingFellow from "./pages/HomePages/TeachingFellow";
import AttendanceQuestion from "./pages/AttendanceQuestionPage";
import Attendance from "./pages/Attendance";
import { useAuth } from "./config/firebase";
import RootLayout from "./layout/RootLayout";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorPage from "./pages/ErrorPage";
import AbsenceReporting from "./pages/AbsenceReporting";
import LeaveRequest from "./pages/LeaveRequest";
import { AttendanceQuestionHidden } from "./pages/AttendanceQuestionHidden";

function App() {
  //get user from firebase config
  const currentUser = useAuth();

  // Determine if the user is authenticated
  const isAuthenticated = !!currentUser;

  // Determine if the user is logged out
  const isLoggedOut = currentUser === null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route
          path="/"
          element={
            isAuthenticated ? (
              <RootLayout isAuthenticated={isAuthenticated} />
            ) : isLoggedOut ? (
              <Navigate to="/signin" /> // Redirect to login when logged out
            ) : (
              <LoadingIndicator />
            )
          }
        >
          <Route index element={isAuthenticated ? <Student /> : null} />
          <Route exact path="/attendance" element={<Attendance />} />
          <Route exact path="/attendance-question" element={<AttendanceQuestion/>} />
          <Route exact path="/absence-reporting" element={<AbsenceReporting/>} />
          <Route exact path="/leave-request" element={<LeaveRequest/>} />
          <Route exact path="/question-hidden" element={<AttendanceQuestionHidden/>} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route path="/" element={<LoginPage />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="students" element={<Student />} />
        <Route exact path="attendance" element={<Attendance />} />
        <Route exact path="teaching-fellow" element={<TeachingFellow />} /> */}
        {/* <Route exact path="attendance-question" element={<AttendanceQuestion/>} /> */}

      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
