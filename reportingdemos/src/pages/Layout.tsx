import { Outlet, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';

const Layout = () => {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Telerik Reporting Demos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="nav-link" active={(location.pathname === "/") ? true : false} >Home</Nav.Link>
                            <Nav.Link href="reports" className="nav-link" active={(location.pathname === "/reports") ? true : false}>Reports</Nav.Link>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
        </>
    )
};

export default Layout;