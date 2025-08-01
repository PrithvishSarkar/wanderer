export const handleLogout = async (toast, setUserData, navigate) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const LOGOUT_API_PATH = import.meta.env.VITE_LOGOUT_API_PATH;
  try {
    const response = await fetch(BACKEND_URL + LOGOUT_API_PATH, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    // Handling Backend Response Properly.
    switch (response.status) {
      case "failure":
        toast.error("Problem Logging Out!");
        break;
      case "success":
        setUserData(null);
        setTimeout(() => navigate("/login"), 0);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Logout Error: ", err);
  }
};
