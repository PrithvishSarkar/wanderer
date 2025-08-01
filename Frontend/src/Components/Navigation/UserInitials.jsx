import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { handleLogout } from "../../utils/authLogout.js";

const UserInitials = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  let firstName = "",
    secondName = "",
    initials = "";

  if (userData) {
    firstName = userData.name.split(" ")[0];
    secondName = userData.name.split(" ")[1];
    initials = firstName[0].toUpperCase() + secondName[0].toUpperCase();
  }

  return (
    <span
      className={`${
        !userData ? "d-none" : "d-flex"
      } justify-content-between align-items-center`}
    >
      <span className="bg-success fw-semibold px-2 mx-2 fs-3 rounded-pill">
        {initials}
      </span>
      <span className="d-flex flex-column fs-6">
        <span>{firstName}</span>
        <Button
          size="sm"
          variant="outline-danger"
          className="fw-semibold"
          onClick={() => handleLogout(toast, setUserData, navigate)}
        >
          Logout
        </Button>
      </span>
    </span>
  );
};

export default UserInitials;
