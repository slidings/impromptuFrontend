import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";

const apiReportPost = (itemId) => {
  return fetch(`${API_URL}/posts/${itemId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ action: "incrementReportCount" }),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.text().then(text => text ? JSON.parse(text) : {});
      } else if (response.status === 400) {
        return response.json().then((data) => {
          throw new Error(data.message || "Bad request");
        });
      } else if (response.status === 404) {
        throw new Error("Item not found");
      } else if (response.status === 403) {
        throw new Error("Permission denied");
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      if (data.reportCount > 5) {
        toast.success("Item has been deleted due to excessive reports");
      } else {
        toast.success("Reported successfully");
      }
      return data;
    })
    .catch((error) => {
      toast.error(error.message);
      throw error;
    });
};

export default apiReportPost;
