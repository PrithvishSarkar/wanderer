import { Col, Container, Row } from "react-bootstrap";
import DefaultBlogCard from "../DisplayBlog/DefaultBlogCard";
import SingleBlogImage from "./SingleBlogImage";
import SingleBlogContent from "./SingleBlogContent";

const SingleBlogContainer = ({
  singleBlogData,
  pageType,
  setShowModal,
  id,
}) => {
  return (
    <Container fluid className="single-blog-container overflow-auto">
      {!singleBlogData ? (
        <DefaultBlogCard />
      ) : (
        <Row className="h-100 g-3">
          <Col sm lg={3} style={{ maxHeight: "fit-content" }}>
            <SingleBlogImage image={singleBlogData.image} />
          </Col>
          <Col sm lg={9}>
            <SingleBlogContent
              id={id}
              title={singleBlogData.title}
              description={singleBlogData.description}
              authorName={singleBlogData.authorName}
              updatedAt={singleBlogData.updatedAt}
              pageType={pageType}
              setShowModal={setShowModal}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SingleBlogContainer;
