import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavigationLink = ({ userData }) => {
  const [specialStyles, setSpecialStyles] = useState({});

  const commonStyles = "text-decoration-none px-3 py-2";

  const handleSpecialStyleChange = () => {
    if (!userData) {
      setSpecialStyles({
        pointerEvents: "none",
        color: "rgba(255, 255, 255, 0.4)",
      });
    } else {
      setSpecialStyles({});
    }
  };

  useEffect(() => {
    handleSpecialStyleChange();
  }, []);
  useEffect(() => {
    handleSpecialStyleChange();
  }, [userData]);
  return (
    <Nav className="fs-5">
      <Link to="/add-blogs" className={commonStyles} style={specialStyles}>
        Add Blogs <FaArrowRight />
      </Link>
      <Link to="/my-blogs" className={commonStyles} style={specialStyles}>
        My Blogs <FaArrowRight />
      </Link>
      <Link to="/all-blogs" className={commonStyles}>
        All Blogs <FaArrowRight />
      </Link>
    </Nav>
  );
};

export default NavigationLink;