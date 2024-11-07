import './UpdateUser.css';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: ""
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        })
      };

      useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch(`http://localhost:8099/api/contacts/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching contact: ", error.message);
            }
        }

        fetchContact();

      }, [id])

      const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8099/api/contacts/update/${id}`, {
                method:`PATCH`,
                headers:{
                    "Content-Type":"application/json"       
            },
            body: JSON.stringify(formData),  
            });

            const data = await response.json();
            console.log("User updated: ", data);

            navigate(`/`);
            
        } catch (error) {
            console.error("Error occured while contact update!", error.message);
        }

      } 

    return (
        <>
        <div className="center-form">
          <h1>Edit Contact</h1>
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
              Edit Contact
            </Button>
          </Form>
        </div>
      </>
    )

}

export default UpdateUser;