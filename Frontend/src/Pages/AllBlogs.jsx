import { Container } from "react-bootstrap";
import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import MainBlogCard from "../Components/DisplayBlog/MainBlogCard.jsx";
import DefaultBlogCard from "../Components/DisplayBlog/DefaultBlogCard.jsx";
import { useBlogContext } from "../Components/ContextAPI/BlogContext.jsx";
import { getAllBlogs } from "../utils/getAllBlogs.js";
import { useEffect } from "react";

const AllBlogs = () => {
  const { blogData, setBlogData } = useBlogContext();
  useEffect(() => {
    getAllBlogs(setBlogData);
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
              // Sorting Newest First
              const formerDate = new Date(a.updatedAt);
              const laterDate = new Date(b.updatedAt);
              return laterDate - formerDate;
            })
            .map((blog, index) => {
              const { _id, title, description, authorName, updatedAt, image } =
                blog;
              const updateDate = new Date(updatedAt).toLocaleString("en-IN", {
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
                  basePath="/all-blogs"
                />
              );
            })
        )}
      </Container>
    </DefaultLayout>
  );
};

export default AllBlogs;
