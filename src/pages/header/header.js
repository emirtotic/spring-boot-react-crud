import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand to="/"> <strong>Phonebook System</strong> </Navbar.Brand>

<Nav className="ml-auto">
    <Nav.Link as={Link} to="/" className="nav-link">Contacts</Nav.Link>
    <Nav.Link as={Link} to="/contact" className="nav-link">Create Contact</Nav.Link>
</Nav>

                </Container>
            </Navbar>
        </>
    )
}

export default Header;