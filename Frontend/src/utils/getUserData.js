export const getUserData = async (setUserData, navigate) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GET_USER_PATH = import.meta.env.VITE_GET_USER_PATH;
  try {
    const responseUser = await fetch(BACKEND_URL + GET_USER_PATH, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    /*
    Handling API call's response corresponding to User's Details.
    Restricting certain routes for both authorized and unauthorized users.
    */
    switch (responseUser.status) {
      case "failure":
        setUserData(null);
        switch (window.location.pathname) {
          case "/add-blogs":
          case "/my-blogs":
            navigate("/login");
            break;
          default:
            break;
        }
      case "success":
        setUserData(responseUser.userData);
        switch (window.location.pathname) {
          case "/login":
          case "/register":
            navigate("/");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("User Data Fetching Error: ", err);
    window.location.reload();
  }
};
