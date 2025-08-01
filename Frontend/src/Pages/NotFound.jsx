import { Link } from "react-router-dom";
import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import { FaArrowRight } from "react-icons/fa6";

const NotFound = () => {
  return (
    <DefaultLayout>
      <main className="not-found-main-container">
        <header className="">
          404 - Error
        </header>
        <p role="title-text">Page Not Found</p>
        <p role="description-text">
          Your search has ventured beyond this known universe!
        </p>
        <Link to="/" className="text-decoration-none mt-5 border-0 bg-info text-dark fw-bold px-3 py-1 rounded-pill not-found-link">Back to Home <FaArrowRight /> </Link>
      </main>
    </DefaultLayout>
  )
}

export default NotFound
