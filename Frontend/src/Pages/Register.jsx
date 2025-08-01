import AuthImage from "../Components/Authorization/AuthImage.jsx";
import AuthContent from "../Components/Authorization/AuthContent.jsx";
import { Stack } from "react-bootstrap";

const Register = () => {
  return (
    <Stack direction="horizontal" className="vh-100 p-1">
      <AuthImage />
      <AuthContent title="Register" />
    </Stack>
  );
};

export default Register;
