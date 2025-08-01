import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { handleEditBlogSubmit } from "../../utils/editBlogSubmit.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditBlogForm = ({ id, setShow }) => {
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
    description: "",
  });
  const [loading, setLoading] = useState(false); // Becomes 'true' when calling API.

  // Reference to Image File Input.
  const formImageRef = useRef(null);

  // Navigate to valid route progammically.
  const navigate = useNavigate();
  return (
    <Form
      encType="multipart/form-data"
      onSubmit={(e) =>
        handleEditBlogSubmit(
          e,
          id,
          formData,
          setFormData,
          setLoading,
          setShow,
          toast,
          formImageRef,
          navigate
        )
      }
      method="POST"
    >
      <Row className="gy-3 mt-lg-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="form-title" xs={12}>
            <Form.Label
              className="fw-semibold"
              style={{ fontSize: "0.875rem" }}
            >
              TITLE
            </Form.Label>
            <Form.Control
              style={{ fontSize: "1.125rem" }}
              type="text"
              name="title"
              placeholder="The Rajasthani Land: Brief History of Mewar"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData((previousData) => ({
                  ...previousData,
                  title: e.target.value,
                }));
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="form-picture">
            <Form.Label
              className="fw-semibold"
              style={{ fontSize: "0.875rem" }}
            >
              PICTURE
            </Form.Label>
            <Form.Control
              style={{ fontSize: "1.125rem" }}
              type="file"
              name="picture"
              accept=".jpg, .jpeg, .png, .avif, .webp"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                const MAX_SIZE = 200 * 1024;
                if (file && file.size > MAX_SIZE) {
                  toast.warn("File size must be within 200kB!");
                  e.target.value = null;
                  return;
                }
                setFormData((previousData) => ({
                  ...previousData,
                  picture: file,
                }));
              }}
              ref={formImageRef}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={12}>
          <Form.Group>
            <Form.Label
              className="fw-semibold"
              style={{ fontSize: "0.875rem" }}
            >
              DESCRIPTION
            </Form.Label>
            <Form.Control
              style={{ fontSize: "1.125rem" }}
              as="textarea"
              name="description"
              rows={2}
              placeholder="The history of the Rajputs of Mewar are covered in..."
              required
              value={formData.description}
              onChange={(e) => {
                setFormData((previousData) => ({
                  ...previousData,
                  description: e.target.value,
                }));
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={3}>
          <Form.Group>
            <Button
              type="submit"
              disabled={loading}
              variant="info"
              className="fw-bold"
            >
              {loading ? (
                <span>Updating...</span>
              ) : (
                <span>
                  Save Changes <FaArrowRightToBracket />
                </span>
              )}
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default EditBlogForm;
