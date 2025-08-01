export const handleEditBlogSubmit = async (
  e,
  id,
  formData,
  setFormData,
  setLoading,
  setShow,
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
  const EDIT_BLOG_PATH = import.meta.env.VITE_EDIT_BLOG_PATH;
  try {
    setLoading(true);
    const response = await fetch(BACKEND_URL + EDIT_BLOG_PATH + "/" + id, {
      method: "PATCH",
      credentials: "include",
      body: formDetails,
    }).then((res) => res.json());

    // Handling Response Gracefully.
    switch (response.status) {
      case "failure":
        toast.error(response.message);
        setShow(false);
        break;
      case "success":
        toast.success(response.message);
        setShow(false);
        setTimeout(() => navigate("/my-blogs"), 0);
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
