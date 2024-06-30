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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

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
      <Route path="/" element={<MainLayout />}>
        {!loggedIn && (
          <Route path="/" element={<LogIn setLoggedIn={setLoggedIn} />} />
        )}
        {loggedIn && (
          <>
            <Route index element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route
              path="/add-job"
              element={<AddJobPage addJobSubmit={addJob} />}
            />
            <Route
              path="/edit-job/:id"
              element={<EditJobPage updateJobSubmit={updateJob} />}
              loader={jobLoader}
            />
            <Route
              path="/jobs/:id"
              element={<JobPage deleteJob={deleteJob} />}
              loader={jobLoader}
            />
          </>
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
