import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home" className="ms-3">DG1 Human Resource Management</Navbar.Brand>
        </Navbar> 
    );
}


