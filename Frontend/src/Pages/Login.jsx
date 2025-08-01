import AuthImage from "../Components/Authorization/AuthImage.jsx";
import AuthContent from "../Components/Authorization/AuthContent.jsx";
import { Stack } from "react-bootstrap";

const Login = () => {
  return (
    <Stack direction="horizontal" gap={1} className="vh-100 p-1">
      <AuthImage />
      <AuthContent title="Login" />
    </Stack>
  );
};

export default Login;
