import { Button, Col, Form, Row } from "react-bootstrap";
import { handleAddBlogSubmit } from "../../utils/addBlogSubmit";
import { toast } from "react-toastify";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../ContextAPI/BlogContext.jsx";

const AddBlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
    description: "",
  });
  const [loading, setLoading] = useState(false); // Becomes 'true' when calling API.

  // Reference to Image File Input.
  const formImageRef = useRef(null);

  // Programmatically navigating to a new page.
  const navigate = useNavigate();

  // Extracting 'setBlogData' State Setter Function from Blog Context API.
  const { setBlogData } = useBlogContext();

  return (
    <Form
      encType="multipart/form-data"
      onSubmit={(e) =>
        handleAddBlogSubmit(
          e,
          formData,
          setFormData,
          setBlogData,
          setLoading,
          toast,
          formImageRef,
          navigate
        )
      }
      method="POST"
    >
      <Row className="gy-3 mt-lg-3">
        <Form.Group as={Col} lg={5} controlId="form-title" xs={12}>
          <Form.Label className="fw-semibold" style={{ fontSize: "0.875rem" }}>
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
        <Form.Group as={Col} lg={5} controlId="form-picture">
          <Form.Label className="fw-semibold" style={{ fontSize: "0.875rem" }}>
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
        <Form.Group as={Col} lg={10}>
          <Form.Label className="fw-semibold" style={{ fontSize: "0.875rem" }}>
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
        <Form.Group as={Col} lg={3}>
          <Button
            type="submit"
            disabled={loading}
            className="fw-bold"
            variant="info"
          >
            {loading ? (
              <span>Publishing...</span>
            ) : (
              <span>
                Publish <FaArrowRightToBracket />
              </span>
            )}
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default AddBlogForm;
