import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the children components
  return children;
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      >
        <>
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <AddJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <EditJobPage updateJobSubmit={updateJob} />
              </ProtectedRoute>
            }
            loader={jobLoader}
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <JobPage deleteJob={deleteJob} />
              </ProtectedRoute>
            }
            loader={jobLoader}
          />
        </>
        <Route path="/login" element={<LogIn setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
