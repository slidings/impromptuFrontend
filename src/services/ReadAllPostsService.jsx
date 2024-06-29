import { API_URL } from "../constants/constants";

// setPosts is a function that sets the posts state from useState.
const apiReadPosts = (setPosts) => {
  fetch(`${API_URL}/posts`, {
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
      setPosts(data);
    });
};

export default apiReadPosts;
