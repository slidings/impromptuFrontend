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
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("is_staff", data.user.is_staff); // Store is_staff in local storage
      toast.success("Logging in successfully");
      setLoggedIn(true);
      navigate("/"); // Navigate to home page upon successful login
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiLogin;
