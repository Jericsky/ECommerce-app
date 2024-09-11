import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <Navbar expand="lg" className="bg-white shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-primary fw-bold">
          Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && user.id ? (
              <>
                {user.isAdmin && (
                  <Nav.Link as={NavLink} to="/products" className="text-secondary">
                    Dashboard
                  </Nav.Link>
                )}
                {!user.isAdmin && (
                  <Nav.Link as={NavLink} to="/products" className="text-secondary">
                    Products
                  </Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/logout" className="text-secondary">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/register" exact="true" className="text-secondary">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" exact="true" className="text-secondary">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
