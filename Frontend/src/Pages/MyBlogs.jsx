import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import DefaultBlogCard from "../Components/DisplayBlog/DefaultBlogCard.jsx";
import MainBlogCard from "../Components/DisplayBlog/MainBlogCard.jsx";
import { useUserContext } from "../Components/ContextAPI/UserContext.jsx";
import { useBlogContext } from "../Components/ContextAPI/BlogContext.jsx";
import { getMyBlogs } from "../utils/getMyBlogs.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

const MyBlogs = () => {
  const { setUserData } = useUserContext();
  const { blogData, setBlogData } = useBlogContext();
  const navigate = useNavigate();
  useEffect(() => {
    /*
    This function internally uses 'handleLogout' as well.
    The arguments 'setUserData', 'toast', and 'navigate' are for 'handleLogout' function.
    */
    getMyBlogs(setUserData, setBlogData, toast, navigate);
  }, []);
  return (
    <DefaultLayout>
      <Container fluid className="blog-cards-container overflow-auto">
        {!blogData ? (
          <DefaultBlogCard />
        ) : (
          blogData
            .slice()
            .sort((a, b) => {
              // Arranging the Array in Descending Order.
              const formerDate = new Date(a.updatedAt);
              const laterDate = new Date(b.updatedAt);
              return laterDate - formerDate;
            })
            .map((blog, index) => {
              const { _id, title, description, authorName, updatedAt, image } =
                blog;
              const updateDate =
                new Date(updatedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });
              return (
                <MainBlogCard
                  key={index}
                  title={title}
                  description={description}
                  updateDate={updateDate}
                  blogId={_id}
                  authorName={authorName}
                  image={image}
                  basePath="/my-blogs"
                />
              );
            })
        )}
      </Container>
    </DefaultLayout>
  );
};

export default MyBlogs;
