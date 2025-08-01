import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { handleAuthSubmit } from "../../utils/authSubmit";
import { CgProfile } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { initialState, reducer } from "../../utils/authReducer.js";
import { useEffect, useReducer } from "react";
import { useUserContext } from "../ContextAPI/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { passwordStrength } from "../../utils/authPassStrength.js";

const AuthForm = ({ isTitleRegister }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Using Context API to provide user's data globally in App level.
  const { setUserData } = useUserContext();

  // Navigate to any Page programically.
  const navigate = useNavigate();

  // Side Effect to determine the strength of the password
  isTitleRegister &&
    useEffect(() => {
      passwordStrength(state, dispatch);
    }, [state.passwordValue]);

  return (
    <Form
      className="mt-5"
      onSubmit={(e) =>
        handleAuthSubmit(
          e,
          isTitleRegister,
          state,
          dispatch,
          setUserData,
          navigate,
          toast
        )
      }
    >
      <Stack gap={3}>
        {/* The 'title' prop has the value 'Register' => show 'NAME' input field */}
        {isTitleRegister && (
          <Form.Group controlId="formName">
            <Form.Label>NAME</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <CgProfile />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={state.nameValue}
                onChange={(e) =>
                  dispatch({ type: "NAME_UPDATE", payload: e.target.value })
                }
              />
            </InputGroup>
          </Form.Group>
        )}
        <Form.Group controlId="formEmail">
          <Form.Label>EMAIL</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <MdAlternateEmail />
            </InputGroup.Text>
            <Form.Control
              type="email"
              name="email"
              value={state.emailValue}
              placeholder="john.doe@example.com"
              required
              onChange={(e) =>
                dispatch({ type: "EMAIL_UPDATE", payload: e.target.value })
              }
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>PASSWORD</Form.Label>
          <InputGroup>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="auth-password-tooltip">
                  Tip: Include Alpha-Numerics and Special Characters.
                </Tooltip>
              }
            >
              <InputGroup.Text>
                <RiLockPasswordFill />
              </InputGroup.Text>
            </OverlayTrigger>
            <Form.Control
              type={state.passwordShow ? "text" : "password"}
              value={state.passwordValue}
              placeholder="********"
              required
              name="password"
              onChange={(e) =>
                dispatch({ type: "PASSWORD_UPDATE", payload: e.target.value })
              }
            />
            <InputGroup.Text
              as={Button}
              variant="light"
              onClick={() => dispatch({ type: "TOGGLE_PASSWORD_SHOW" })}
            >
              {state.passwordShow ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
          {isTitleRegister && (
            <small
              data-role="password-strength"
              className={`text-${state.passwordStrengthColor}`}
            >
              {state.passwordStrength}
            </small>
          )}
        </Form.Group>
      </Stack>
      <br />
      <Button
        type="submit"
        disabled={state.loading}
        className="fw-bold col-4 offset-8"
        variant="info"
      >
        {state.loading
          ? "Please Wait..."
          : isTitleRegister
          ? "Register"
          : "Login"}
      </Button>
    </Form>
  );
};

export default AuthForm;
