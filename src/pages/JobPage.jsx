import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { format } from "date-fns";
import apiGetPost from "../services/GetPostService";
import apiDeletePost from "../services/DeletePostService";
import apiReportPost from "../services/ReportPostService"; // Import the report service
import Map from "../components/Map";

const JobPage = () => {
  const [isReported, setIsReported] = useState(false); // Track report status
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const isStaff = localStorage.getItem("is_staff") === 'true'; // Retrieve and parse is_staff
  const job = useLoaderData();
  const description = job.description || "";
  const additional_info = job.additional_info || "";

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;
    apiDeletePost(jobId, navigate);
  };

  const onReportClick = () => {
    const confirm = window.confirm("Abuse of the report function may lead to a suspension of your account. Continue to report?");
    if (confirm) {
      apiReportPost(job.id).then(() => {
        setIsReported(true); // Disable the button after a successful report
      }).catch((error) => {
        console.error(error); // Optionally handle the error
      });
    }
  };

  const locationName = job.location;
  const formattedDate = job.date ? format(new Date(job.date), "PPpp") : "";
  const formattedPostDate = job.timestamp ? format(new Date(job.timestamp), "PPpp") : "";
  const formattedUpdateDate = job.updated ? format(new Date(job.updated), "PPpp") : "";

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/jobs" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{locationName}</p>
                </div>
                {formattedDate && (
                  <div className="text-gray-500 mb-4">
                    <strong>Task Date & Time: </strong>{formattedDate}
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">Task Description</h3>
                <p className="mb-4">
                  {description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <Map latitude={job.latitude} longitude={job.longitude} location={job.location} />
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>

                <div className="text-center md:text-left mb-6">
                  <p className="text-xl text-gray-600">{job.name}</p>
                </div>

                <p className="my-2">
                  {additional_info.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.email}</p>

                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.phone}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                {formattedPostDate && (
                  <div className="text-gray-500 mb-4">
                    <strong>Posted On: </strong>{formattedPostDate}
                  </div>
                )}
                {formattedUpdateDate && (
                  <div className="text-gray-500 mb-4">
                    <strong>Last Updated: </strong>{formattedUpdateDate}
                  </div>
                )}
              </div>

              {job.user == id || isStaff ? (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-xl font-bold mb-6">Manage Task</h3>
                  <Link to={`/edit-job/${job.id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                    Edit Task
                  </Link>
                  <button
                    onClick={() => onDeleteClick(job.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Delete Task
                  </button>
                </div>
              ) : (
                <div className="bg-white p-5 rounded-lg shadow-md mt-6">
                  <button
                    onClick={onReportClick}
                    disabled={isReported} // Disable button if reported
                    className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 flex items-center justify-center ${isReported ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <FaFlag className="mr-2" />
                    {isReported ? 'Reported' : 'Report as inappropriate'}
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

// call api directly
const jobLoader = async ({ params }) => {
  const res = await apiGetPost(params.id);
  return res;
};

export { JobPage as default, jobLoader };
