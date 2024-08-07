import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to extract the location name without coordinates
  const extractLocationName = (location) => {
    const matches = location.match(/^(.*)\(\d+(\.\d+)?,\s?\d+(\.\d+)?\)$/);
    return matches ? matches[1].trim() : location;
  };

  const locationName = extractLocationName(job.location);

  // Check if description is null or undefined first
  let description = job.description ?? "No description available.";

  if (!showFullDescription && description !== "No description available.") {
    description = description.substring(0, 90) + "...";
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className="text-indigo-500 mb-5 hover:text-indigo-600"
        >
          {showFullDescription ? "Less" : "More"}
        </button>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3 truncate flex-grow-1">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {locationName}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm flex-shrink-0"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
