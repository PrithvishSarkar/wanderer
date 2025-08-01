import DefaultLayout from "../Components/Navigation/DefaultLayout";
import SingleBlogContainer from "../Components/SingleBlog/BlogContainer.jsx";
import { useSingleBlogContext } from "../Components/ContextAPI/SingleBlogContext.jsx";
import { useEffect } from "react";
import { getSingleBlog } from "../utils/getSingleBlog.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const SingleBlogPublic = () => {
  const { singleBlogData, setSingleBlogData } = useSingleBlogContext();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getSingleBlog(id, setSingleBlogData, toast, navigate);
  }, []);
  return (
    <DefaultLayout>
      <SingleBlogContainer singleBlogData={singleBlogData} pageType="public" />
    </DefaultLayout>
  );
};

export default SingleBlogPublic;
