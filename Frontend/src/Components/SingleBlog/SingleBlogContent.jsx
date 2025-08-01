import { Badge, Button, ButtonGroup, Stack } from "react-bootstrap";
import { TbExchange } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { handleDeleteBlog } from "../../utils/deleteBlog.js";
import { useNavigate } from "react-router-dom";

const SingleBlogContent = ({
  id,
  title,
  description,
  authorName,
  updatedAt,
  pageType,
  setShowModal,
}) => {
  const navigate = useNavigate();
  const updateDate = new Date(updatedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const displayButtonGroup = pageType === "private";
  const buttonClass =
    "bg-transparent border-0 px-1 py-0 fs-5 d-flex align-center";
  return (
    <Stack gap={2} className="p-0 m-0">
      <div className="m-0">
        <span
          className="me-5"
          style={{ fontSize: "0.875rem", fontFamily: "cursive, sans-serif" }}
        >
          {updateDate}
        </span>
        <Badge pill text="dark" bg="secondary">
          {authorName}
        </Badge>
        <ButtonGroup
          size="sm"
          className={`ms-3 ${!displayButtonGroup && "d-none"}`}
        >
          <Button
            className={`text-warning ${buttonClass}`}
            onClick={() => setShowModal(true)}
          >
            <TbExchange />
          </Button>
          <Button
            className={`text-danger ${buttonClass}`}
            onClick={() => handleDeleteBlog(id, navigate)}
          >
            <MdDelete />
          </Button>
        </ButtonGroup>
      </div>
      <p role="blog-content-title" className="blog-content-title my-2">
        {title}
      </p>
      <p role="blog-content-description" className="m-0 fst-italic">
        {description}
      </p>
    </Stack>
  );
};

export default SingleBlogContent;
