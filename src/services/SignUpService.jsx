import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiSignUp = (user, navigate) => {
  fetch(`${API_URL}/signup/`, {
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
      } else if (response.status === 400) {
        return response.json().then((data) => {
          throw new Error(data.username || data.email || data.password);
        });
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("token", data.token);
      toast.success("Sign up successful");
      navigate("/");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiSignUp;
