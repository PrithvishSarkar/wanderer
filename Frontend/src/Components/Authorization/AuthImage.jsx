import { Container, Image } from "react-bootstrap";

const AuthImage = () => {
  return (
    <Container
      className="d-none d-md-flex"
      style={{
        minWidth: "50%",
        minHeight: "90%",
        boxSizing: "border-box",
      }}
    >
      <Image
        src="/authPageImage.png"
        alt="Login Page Image"
        className="align-items-center justify-content-center"
        style={{
          objectFit: "fill",
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />
    </Container>
  );
};

export default AuthImage;
