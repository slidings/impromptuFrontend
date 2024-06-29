import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiDeletePost = (id, navigate) => {
  fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        navigate("/login");
        throw new Error("You do not have permission to update this post.");
      } else if (response.status == 404) {
        throw new Error("Post not found.");
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      toast.success("Post deleted successfully.");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export default apiDeletePost;
