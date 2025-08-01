import { Navbar, Offcanvas } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { useUserContext } from "../ContextAPI/UserContext.jsx";
import NavigationLink from "./NavigationLink.jsx";
import UserInitials from "./UserInitials.jsx";

const DefaultLayout = ({ children }) => {
  const { userData, setUserData } = useUserContext();
  return (
    <div>
      <Navbar expand="lg" bg="transparent" className="px-3">
        <Navbar.Brand
          href="/"
          className="fs-4 background-image-navbar-brand"
          style={{ fontFamily: "Playwrite HU, sans-serif" }}
        >
          <span className="border border-danger px-2 rounded-3">B</span>
          <span className="fw-semibold fst-italic ms-1 me-2">Wanderer</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-none d-lg-flex justify-content-between"
        >
          <NavigationLink userData={userData} />
        </Navbar.Collapse>
        <Navbar.Offcanvas
          placement="start"
          id="basic-navbar-nav"
          responsive="lg"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <UserInitials userData={userData} setUserData={setUserData} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NavigationLink userData={userData} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <span className="d-none d-lg-inline">
          <UserInitials userData={userData} setUserData={setUserData} />
        </span>
      </Navbar>
      {children}
      <footer
        className="position-fixed bottom-0 text-center w-100 py-1"
        style={{ color: "rgba(255, 255, 255, 0.3)" }}
      >
        Made with <FaHeart color="red" /> by Prithvish Sarkar
      </footer>
    </div>
  );
};

export default DefaultLayout;
