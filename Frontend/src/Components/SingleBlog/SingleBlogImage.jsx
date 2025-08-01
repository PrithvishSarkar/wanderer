import { Container, Image } from "react-bootstrap";

const SingleBlogImage = ({ image }) => {
  const { imageData, imageContentType } = image;
  const imageUrl = `data:${imageContentType};base64,${imageData}`;
  return (
    <Container
      fluid
      style={{maxHeight: "100%", maxWidth: "100%"}}
      className="d-flex justify-content-center"
    >
      <Image
        rounded
        fluid
        src={imageUrl}
        alt="blog-card-image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </Container>
  );
};

export default SingleBlogImage;
