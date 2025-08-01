import { Container } from "react-bootstrap";
import DefaultLayout from "../Components/Navigation/DefaultLayout.jsx";
import { MdTravelExplore } from "react-icons/md";
import AddBlogForm from "../Components/Miscellaneous/AddBlogForm.jsx";

const AddBlogs = () => {
  return (
    <DefaultLayout>
      <Container fluid className="add-blog-container">
        <p role="title-text">Your contributions are valueable!</p>
        <p role="description-text">
          Feel free to share your journey with us <MdTravelExplore />
        </p>
        <AddBlogForm />
      </Container>
    </DefaultLayout>
  );
};

export default AddBlogs;
