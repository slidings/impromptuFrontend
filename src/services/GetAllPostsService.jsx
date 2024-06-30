import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

// setPosts is a function that sets the posts state from useState.
const apiReadPosts = (setJobs) => {
  fetch(`${API_URL}/posts/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("An error occured. Please try again later.");
      }
    })
    .then((data) => {
      console.log(data);
      setJobs(data);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiReadPosts;
