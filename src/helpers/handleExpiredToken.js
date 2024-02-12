import toast from "react-hot-toast";

export function handleExpiredToken(error) {
  if (error.status === 401) {
    toast("Token expired please login again");
    localStorage.removeItem("token");
    window.location.reload();
  } else {
    throw error;
  }
}
