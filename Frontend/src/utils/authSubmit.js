export const handleAuthSubmit = async (
  e,
  isTitleRegister,
  state,
  dispatch,
  setUserData,
  navigate,
  toast
) => {
  e.preventDefault();
  if (isTitleRegister && state.nameValue.trim().length === 0) {
    toast.warn("Name cannot be empty!");
    return;
  } else if (state.emailValue.trim().length === 0) {
    toast.warn("Email cannot be empty!");
    return;
  } else if (state.passwordValue.trim().length === 0) {
    toast.warn("Password cannot be empty!");
    return;
  } else if (state.passwordValue.trim().includes(" ")) {
    toast.warn("Password cannot contain empty spaces!");
    return;
  } else {
    dispatch({ type: "LOADING_STATUS_UPDATE" });
    try {
      // API URLs should always be in Environment Variables.
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const API_CALL_PATH = isTitleRegister
        ? import.meta.env.VITE_REGISTER_API_PATH
        : import.meta.env.VITE_LOGIN_API_PATH;

      // Making the API call to Backend.
      const response = await fetch(BACKEND_URL + API_CALL_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.nameValue,
          email: state.emailValue,
          password: state.passwordValue,
        }),
        credentials: "include", // Important: Used to allow 'cookies' in browser
      }).then((res) => res.json());

      // Handling Backend Response Properly.
      switch (response.status) {
        case "failure":
          toast.error(response.message);
          break;
        case "success":
          toast.success(response.message);
          setUserData(response.userData);
          setTimeout(() => navigate("/all-blogs"), 0);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Registration/Login Error: ", err);
      toast.error("Something Broke");
    }
  }
  isTitleRegister && dispatch({ type: "NAME_UPDATE", payload: "" });
  dispatch({ type: "EMAIL_UPDATE", payload: "" });
  dispatch({ type: "PASSWORD_UPDATE", payload: "" });
  dispatch({ type: "LOADING_STATUS_UPDATE", payload: false });
};
