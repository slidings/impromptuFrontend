import { API_URL } from "../constants/constants";

const apiSignUp = (user, setErrors, navigate) => {
  fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 406) {
        // 406 not acceptable
        return res.json().then((err) => {
          throw new Error(err.error.join("\n"));
        });
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    })
    .then((data) => {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("username", user.username);
      navigate(`/`);
    })
    .catch((error) => setErrors(error.message));
};

export default apiSignUp;
