import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "../components/SearchBox";
import Maps from "../components/Maps";
import apiCreatePost from "../services/CreatePostService";

const AddJobPage = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  const [type, setType] = useState("Request");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [additional_info, setAdditionalInfo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (!selectPosition) {
      toast.error("Please select a location");
      return;
    }

    const location = selectPosition.display_name;
    const latitude = selectPosition.lat;
    const longitude = selectPosition.lon;

    const data = {
      title,
      type,
      location,
      description,
      name,
      additional_info,
      email,
      phone,
      date,
      latitude,
      longitude,
    };

    apiCreatePost(data, navigate);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Task</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Task Type</label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Request">Request (I need something!)</option>
                <option value="Service">Service (I want to offer something!)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Task Listing Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Need help in assembling my ikea furniture"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any task explanation, remuerations, requirements, etc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Search Location</label>
              <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
            </div>
            {selectPosition && (
              <div className="mb-4">
                <Maps selectPosition={selectPosition} />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="event_datetime" className="block text-gray-700 font-bold mb-2">Task Date & Time</label>
              <input
                type="datetime-local"
                id="event_datetime"
                name="event_datetime"
                className="border rounded w-full py-2 px-3"
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <h3 className="text-2xl mb-5">Contact Info</h3>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">Additional Information</label>
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Eg. Alternate ways to contact"
                value={additional_info}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="contact_email" className="block text-gray-700 font-bold mb-2">Contact Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for contact"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact_phone" className="block text-gray-700 font-bold mb-2">Contact Phone</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddJobPage;
