export const getAllBlogs = async (setBlogData) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GET_ALL_BLOGS_PATH = import.meta.env.VITE_GET_ALL_BLOGS_PATH;
  try {
    const response = await fetch(BACKEND_URL + GET_ALL_BLOGS_PATH, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    // Handling Backend Response Regarding Blogs' Data Properly.
    switch (response.status) {
      case "failure":
        setBlogData(null);
        window.location.reload();
        break;
      case "success":
        setBlogData(response.blogs);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Blogs Fetching Error: ", err);
    window.location.reload();
  }
};
