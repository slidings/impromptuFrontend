import { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiLogin from "../services/LoginService";

const LogIn = () => {
  const [user, setUser] = useState({
    username: "user1",
    password: "password1",
  });
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    console.log(user);
    apiLogin(user, setErrors, navigate);
  };

  return (
    <section className="bg-indigo-50 h-screen">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter username"
                required
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            {errors && (
              <p className="text-red-500 my-4 font-semibold">{errors}</p>
            )}

            <div className="mb-4">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
            <div>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default LogIn;
