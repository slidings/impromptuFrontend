import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiLogin = (user, navigate, setLoggedIn) => {
  fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("Invalid username");
      } else if (response.status === 401) {
        throw new Error("Invalid password");
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("username", user.username);
      localStorage.setItem("usernanme", user.id);
      toast.success("Logging in successfully");
      setLoggedIn(true);
      navigate("/"); // Navigate to home page upon successful login
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiLogin;
