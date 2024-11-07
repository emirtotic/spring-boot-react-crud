import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const Dashboard =() => {

    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:8099/api/contacts/all");
                const data = await response.json();

                setContacts(data);
            } catch (error) {
                console.error("Error fetching contacts: ", error.message);
            }
        }

        fetchContacts();

    },[]);

    const handleUpdate = (contactId) => {
        navigate(`/contacts/${contactId}`);
    }

    const handleDelete = async (contactId) => {
        try {
            const response = await fetch(`http://localhost:8099/api/contacts/delete/${contactId}`, {
                method: "DELETE",
            });

            if(response.ok) {
                setContacts((prevContacts) => 
                  prevContacts.filter((contact) => contact.id !== contactId))
            }
        
            console.log(`Contact with id ${contactId} has been deleted successfully.`);
        } catch (error) {
            console.error(`Error occurred deleting the contact.`, error.message);
        }
    }


    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Contacts</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.surname}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => handleUpdate(contact.id)}>Update</Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(contact.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard;