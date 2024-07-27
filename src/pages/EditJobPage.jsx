import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiUpdatePost from "../services/UpdatePostService";
import SearchBox from "../components/SearchBox";
import Maps from "../components/Maps";

const EditJobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: job.title || "",
    type: job.type || "",
    description: job.description || "",
    name: job.name || "",
    location: job.location || "",
    latitude: job.latitude || null,
    longitude: job.longitude || null,
    additional_info: job.additional_info || "",
    email: job.email || "",
    phone: job.phone || "",
    date: job.date ? new Date(job.date).toISOString().slice(0, 16) : "",
  });

  const [selectPosition, setSelectPosition] = useState({
    display_name: job.location || "",
    lat: job.latitude || null,
    lon: job.longitude || null,
  });

  useEffect(() => {
    if (selectPosition.display_name) {
      setFormData((prevData) => ({
        ...prevData,
        location: selectPosition.display_name,
        latitude: selectPosition.lat,
        longitude: selectPosition.lon,
      }));
    }
  }, [selectPosition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      id: job.id,
    };

    apiUpdatePost(data, navigate);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Task
            </h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Task Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Request">Request (I need something!)</option>
                <option value="Service">Service (I want to offer something!)</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Task Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Need help in assembling my ikea furniture"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any task explanation, remuerations, requirements, etc"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Search Location</label>
              <SearchBox
                selectPosition={selectPosition}
                setSelectPosition={setSelectPosition}
                defaultValue={formData.location}
              />
            </div>

            <div className="mb-4">
              <Maps selectPosition={selectPosition} />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                Task Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <h3 className="text-2xl mb-5">Contact Info</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="additional_info" className="block text-gray-700 font-bold mb-2">
                Additional Information
              </label>
              <textarea
                id="additional_info"
                name="additional_info"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Eg. Alternate ways to contact"
                value={formData.additional_info}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Contact Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for contact"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
