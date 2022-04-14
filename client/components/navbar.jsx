import React from 'react';
import { Container, Offcanvas, Navbar, Nav } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'My Garage'
    };
  }

  render() {
    return (
      <Navbar className="bg-component-blue navbar-dark" expand={'lg'} collapseOnSelect='true'>
        <Container className="justify-content-start">
          <Navbar.Brand className='work-sans d-none d-lg-block fs-1'>Vehicle Expenses Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className='bg-navbar-menu'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className='work-sans' id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3">
                <Nav.Link className='open-sans text-reset text-decoration-none' href="#garage">Garage</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand className='work-sans d-lg-none ms-3 fs-1'>{this.state.route}</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
