import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiCreatePost = (data, navigate) => {
  fetch(`${API_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        navigate("/login");
        throw new Error("Forbidden, please login.");
      } else if (response.status == 400) {
        return response.json().then((err) => {
          // Concatenate all error messages into a single string
          const errorMessages = Object.keys(err)
            .map((key) => `${key}: ${err[key].join(", ")}`)
            .join("\n");
          throw new Error(errorMessages);
        });
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      toast.success("Post creataed successfully.");
      navigate(`/jobs/${data.thread.id}`); // Redirect to the post page
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiCreatePost;
