import { Badge, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const BlogContent = ({
  title,
  description,
  updateDate,
  blogId,
  authorName,
  basePath
}) => {
  return (
    <Stack gap={2} className="p-0 m-0">
      <p className="m-0">
        <span
          className="me-5"
          style={{ fontSize: "0.875rem", fontFamily: "cursive, sans-serif" }}
        >
          {updateDate}
        </span>
        <Badge pill text="dark" bg="secondary">
          {authorName}
        </Badge>
      </p>
      <p role="blog-content-title" className="blog-content-title m-0">
        {title}
      </p>
      <p
        role="blog-content-description"
        className="blog-content-description m-0 fst-italic"
      >
        {description}
      </p>
      <Link
        to={`${basePath}/${blogId}`}
        className="text-decoration-none"
        style={{ fontSize: "0.875rem" }}
      >
        Read More <FaArrowRight />
      </Link>
    </Stack>
  );
};

export default BlogContent;
