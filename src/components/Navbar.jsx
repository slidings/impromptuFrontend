import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react"; // Import useEffect and useState\

const Navbar = ({ setLoggedIn, loggedIn }) => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const signOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // Navigate to the main page
    setLoggedIn(false);
    navigate("/login");
  };

  const logIn = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Impromptu
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Tasks
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Task
                </NavLink>
                <button
                  onClick={loggedIn ? signOut : logIn} // Toggle between signOut and logIn based on isLoggedIn state
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  {loggedIn ? "Sign Out" : "Log In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
