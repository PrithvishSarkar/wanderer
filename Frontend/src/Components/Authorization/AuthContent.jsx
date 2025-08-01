import { FaHandPointDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm.jsx";
import { Container } from "react-bootstrap";

// The 'title' prop can have only two possible values - "Register" and "Login".
const AuthContent = ({ title }) => {
  const isTitleRegister = title === "Register";

  return (
    <Container>
      <h1 className="ps-3 text-warning fw-semibold my-4 libertinus-math-auth-header">
        {isTitleRegister ? "Register" : "Login"} Here <FaHandPointDown />
      </h1>
      <h2 className="special-elite-auth-welcome">
        Welcome {!isTitleRegister && "Back"} to{" "}
        <Link to="/" className="background-image-auth-blogapp">
          Wanderer
        </Link>
      </h2>
      {!isTitleRegister && (
        <small className="fst-italic">
          It's wonderful to see you again here!
        </small>
      )}
      <AuthForm isTitleRegister={isTitleRegister} />
      <br />
      {isTitleRegister ? (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      ) : (
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      )}
    </Container>
  );
};

export default AuthContent;
