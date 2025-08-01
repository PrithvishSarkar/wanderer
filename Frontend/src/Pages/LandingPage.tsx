import { Container, Image } from "react-bootstrap";
import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserContext } from "../Components/ContextAPI/UserContext.jsx";

function LandingPage() {
  const { userData } = useUserContext();
  let startHereLink = !userData ? "/login" : "/all-blogs";
  return (
    <DefaultLayout>
      <Container fluid className="landing-page-container">
        <main
          className="landing-page-main"
          style={{ lineHeight: 1.2, flexGrow: 1 }}
        >
          <p role="title-text">
            Share your story today!
            <br />
            Start Blogging Now.
          </p>
          <p role="description-text">
            It's time to transform your ideas into engaging blog posts. Our
            easy-to-use platform makes blogging <span>simple</span> and{" "}
            <span>enjoyable</span>
          </p>
          <Link
            to={startHereLink}
            className="text-decoration-none px-3 py-2 border border-primary bg-primary 
            rounded-pill text-white fw-semibold"
          >
            Start Here <FaArrowRight />
          </Link>
        </main>
        <section>
          <Image
            fluid
            roundedCircle
            className="d-lg-none"
            src="/landing-page-image-phone.jpg"
            alt="landing-page-image"
          />
          <Image
            className="d-none d-lg-inline"
            src="/landing-page-image-PC.jpg"
            alt="landing-page-image"
            height="100%"
            style={{
              objectFit: "fill",
              objectPosition: "center",
              borderRadius: "40% 60% 30% 70% / 75% 25% 75% 25%",
            }}
          />
        </section>
      </Container>
    </DefaultLayout>
  );
}

export default LandingPage;
