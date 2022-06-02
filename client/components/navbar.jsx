import React from 'react';
import { Container, Offcanvas, Navbar, Nav } from 'react-bootstrap';
import VehicleContext from '../lib/vehicleContext-context';
class Navigation extends React.Component {
  render() {
    let title = 'My Garage';
    const linkClass = 'open-sans text-reset text-capitalize text-decoration-none border-bottom w-50';
    if (this.props.route === 'vehicle-records') {
      title = 'Vehicle Records';
    }
    let menuItem = 'Sign-In';
    if (this.props.user) {
      menuItem = 'garage';
    }
    return (
      <Navbar className='bg-component-blue navbar-dark sticky-top py-0' expand={'lg'} collapseOnSelect='true'>
        <Container className='justify-content-start'>
          <Navbar.Brand className='work-sans d-none d-lg-block fs-1'>Vehicle Expenses Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls='menu' />
          <Navbar.Offcanvas
            id='menu'
            aria-labelledby='menuList'
            placement='start'
            className='h-100'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className='work-sans' id='menuList'>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='flex-grow-1 pe-3'>
                <Nav.Link className={linkClass} href={`#${menuItem}`}>{menuItem}</Nav.Link>
                {this.props.user && <Nav.Link className={linkClass} href='#sign-in' onClick={this.context.handleSignOut}>Sign-Out</Nav.Link>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand className='work-sans d-lg-none ms-3 fs-1'>{title}</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}
Navigation.contextType = VehicleContext;
export default Navigation;
