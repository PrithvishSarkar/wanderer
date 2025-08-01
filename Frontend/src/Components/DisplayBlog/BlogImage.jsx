import { Container, Image } from "react-bootstrap";

const BlogImage = ({ image }) => {
  const { imageData, imageContentType } = image;
  const imageUrl = `data:${imageContentType};base64,${imageData}`;
  return (
    <Container
      fluid
      className="overflow-hidden d-flex p-0 m-0"
      style={{maxHeight: "140px"}}
    >
      <Image
        rounded
        fluid
        src={imageUrl}
        alt="blog-card-image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
        }}
      />
    </Container>
  );
};

export default BlogImage;
