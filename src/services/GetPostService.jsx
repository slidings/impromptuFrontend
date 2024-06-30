import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiGetPost = (id) => {
  fetch(`${API_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        console.log("gotpost")
        return response.json();
      } else if (response.status == 404) {
        throw new Error("Post not found.");
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      toast.success("Post retrieved successfully.");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiGetPost;
