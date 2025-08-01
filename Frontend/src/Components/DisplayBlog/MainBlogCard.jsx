import BlogImage from "./BlogImage.jsx";
import BlogContent from "./BlogContent.jsx";
import { Col, Row } from "react-bootstrap";

const MainBlogCard = ({
  title,
  description,
  updateDate,
  blogId,
  authorName,
  image,
  basePath
}) => {
  return (
    <Row
      className="gy-2 m-1 pb-2 rounded-2"
      style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
    >
      <Col xs lg={3}>
        <BlogImage image={image} />
      </Col>
      <Col xs lg={9}>
        <BlogContent
          title={title}
          description={description}
          updateDate={updateDate}
          blogId={blogId}
          authorName={authorName}
          basePath={basePath}
        />
      </Col>
    </Row>
  );
};

export default MainBlogCard;
