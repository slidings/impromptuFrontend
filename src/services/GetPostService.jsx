import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiGetPost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Post not found.");
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default apiGetPost;
