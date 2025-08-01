import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import AddBlogs from "./Pages/AddBlogs.jsx";
import AllBlogs from "./Pages/AllBlogs.jsx";
import MyBlogs from "./Pages/MyBlogs.jsx";
import SingleBlogPublic from "./Pages/SingleBlogPublic.jsx";
import SingleBlogPrivate from "./Pages/SingleBlogPrivate.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { useEffect } from "react";
import { useUserContext } from "./Components/ContextAPI/UserContext.jsx";
import { getUserData } from "./utils/getUserData.js";

const App = () => {
  /*
  Waking up the Backend Server by making an API call whenever the page renders.
  This API call will populate 'userData' and 'blogData'.
  */
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    getUserData(setUserData, navigate);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-blogs" element={<AddBlogs />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/all-blogs/:id" element={<SingleBlogPublic />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/my-blogs/:id" element={<SingleBlogPrivate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
