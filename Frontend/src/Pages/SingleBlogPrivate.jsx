import { useEffect, useState } from "react";
import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import SingleBlogContainer from "../Components/SingleBlog/BlogContainer.jsx";
import EditBlogModal from "../Components/Miscellaneous/EditBlogModal.jsx";
import { getSingleBlog } from "../utils/getSingleBlog.js";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useSingleBlogContext } from "../Components/ContextAPI/SingleBlogContext.jsx";

const SingleBlogPrivate = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { singleBlogData, setSingleBlogData } = useSingleBlogContext();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleBlog(id, setSingleBlogData, toast, navigate);
  }, []);
  return (
    <DefaultLayout>
      <SingleBlogContainer
        singleBlogData={singleBlogData}
        pageType="private"
        setShowModal={setShowModal}
        id={id}
      />
      <EditBlogModal
        show={showModal}
        setShow={setShowModal}
        id={id}
      />
    </DefaultLayout>
  );
};

export default SingleBlogPrivate;
