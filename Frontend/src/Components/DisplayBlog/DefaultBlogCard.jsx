import { Container, Image } from "react-bootstrap";

const DefaultBlogCard = () => {
  return (
    <Container
      fluid
      className="h-100 w-100 d-flex justify-content-center align-items-center"
    >
      <Image
        src="/no-data-found.png"
        alt="No Blogs Image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </Container>
  );
};

export default DefaultBlogCard;
