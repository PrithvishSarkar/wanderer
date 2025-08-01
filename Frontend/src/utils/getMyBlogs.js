import { handleLogout } from "./authLogout";

export const getMyBlogs = async (
  setUserData,
  setBlogData,
  toast,
  navigate
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GET_MY_BLOGS_PATH = import.meta.env.VITE_GET_MY_BLOGS_PATH;
  try {
    const response = await fetch(BACKEND_URL + GET_MY_BLOGS_PATH, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    // Handling Response Appropriately.
    switch (response.status) {
      // Failure => Token doesn't exists or is unverified.
      case "failure":
        toast("Unauthorized User - Please Login Again!");
        handleLogout(toast, setUserData, navigate); // User will be logged out forcefully.
        setBlogData(null);
        break;
      case "success":
        setBlogData(response.blogs);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("My Blogs Fetching Error: ", err);
    window.location.reload();
  }
};
