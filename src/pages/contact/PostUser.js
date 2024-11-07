import { useState } from "react";
import "./PostUser.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8099/api/contacts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Contact created: ", data);
      navigate("/");
    } catch (error) {
      console.log("Error creating contact: ", error.message);
    }
  };

  return (
    <>
      <div className="center-form">
        <h1>Create New Contact</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fromBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fromBasicName">
            <Form.Control
              type="text"
              name="surname"
              placeholder="Enter surname"
              value={formData.surname}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fromBasicName">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fromBasicName">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Post Contact
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PostUser;
