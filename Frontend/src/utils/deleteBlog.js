import { toast } from "react-toastify";

export const handleDeleteBlog = async (id, navigate) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const DELETE_BLOG_PATH = import.meta.env.VITE_DELETE_BLOG_PATH;
  try {
    const response = await fetch(BACKEND_URL + DELETE_BLOG_PATH + "/" + id, {
      method: "DELETE",
      credentials: "include",
    }).then(res => res.json());

    // Handling Response Gracefully.
    switch (response.status) {
      case "failure":
        toast.error(response.message);
        break;
      case "success":
        toast.success(response.message);
        navigate("/my-blogs");
        break;
      default: break;
    }
  } catch (err) {
    toast.error("Error Occured - Could Not Delete Blog!");
    console.error("Blog Deletion Error: ", err);
  }
}