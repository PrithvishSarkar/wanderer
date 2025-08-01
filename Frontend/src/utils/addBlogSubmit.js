export const handleAddBlogSubmit = async (
  e,
  formData,
  setFormData,
  setBlogData,
  setLoading,
  toast,
  formImageRef,
  navigate
) => {
  e.preventDefault();

  // Validating 'formData' values, invalid field values will be rejected.
  const { title, picture, description } = formData;
  if (!title || !picture || !description) {
    toast.warn("Please fill all fields!");
    setFormData({ title: "", picture: null, description: "" });
    formImageRef.current.value = null;
    return;
  }

  // Populating Form Data using 'formData' values.
  const formDetails = new FormData();
  formDetails.append("title", title);
  formDetails.append("picture", picture);
  formDetails.append("description", description);

  // Sending 'formDetails' Form Data to Backend.
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ADD_BLOG_PATH = import.meta.env.VITE_ADD_BLOG_PATH;
  try {
    setLoading(true);
    const response = await fetch(BACKEND_URL + ADD_BLOG_PATH, {
      method: "POST",
      credentials: "include",
      body: formDetails,
    }).then((res) => res.json());

    /*
      Handling failure response from both Middleware or Route Handler.
      Failure Responses are rare to occur, but will be tackled properly.
      */
    switch (response.status) {
      case "failure":
        toast.error(response.message);
        navigate("/login");
        break;
      case "success":
        toast.success(response.message);
        const blog = response.blog;
        setBlogData((previousBlogArray) => [...previousBlogArray, blog]);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Error Adding Blog: ", err);
    toast.error("Error Adding Blog!");
  }
  setFormData({ title: "", picture: null, description: "" });
  formImageRef.current.value = null;
  setLoading(false);
};
