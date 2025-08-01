export const getSingleBlog = async (id, setSingleBlogData, toast, navigate) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GET_MY_BLOGS_PATH = import.meta.env.VITE_GET_MY_BLOGS_PATH;
  const response = await fetch(BACKEND_URL + GET_MY_BLOGS_PATH + "/" + id, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());

  // Handling Response Properly.
  switch (response.status) {
    case "failure":
      switch (response.message) {
        case "Token Not Found - Unauthorized User!":
        case "Unverified Token - Unauthorized User!":
          navigate("/login");
          break;
        case "Blog Not Found!":
          toast(response.message);
          setSingleBlogData(response.blog); // The value of `response.blog` will be `null` here.
          break;
        default:
          break;
      }
    case "success":
      setSingleBlogData(response.blog); // The 'blogData' will now be an Object not an Array.
      break;
    default:
      break;
  }
};
