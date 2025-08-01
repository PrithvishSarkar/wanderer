import { Modal } from "react-bootstrap";
import EditBlogForm from "./EditBlogForm.jsx";

const EditBlogModal = ({ show, setShow, id }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Please fill all fields to update your blog!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditBlogForm
          id={id}
          setShow={setShow}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditBlogModal;
