import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import CartSidebar from './cartSidebar';

const MyNavbar = () => {

    const navigate = useNavigate()

    const logout = () => {
      localStorage.setItem("token", "")
      navigate("/login")
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   

    return (
      <>
      <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to="/">E commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>Purchases (Sidebar)</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
<CartSidebar show={show} handleClose={handleClose}/>
 </>
    );
};

export default MyNavbar;