import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Nav } from 'react-bootstrap';
import AddForm from './add-record';
// import { Container, Offcanvas, Navbar, Nav } from 'react-bootstrap';

// class Navigation extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       route: 'My Garage'
//     };
//   }

//   render() {
//     return (
//       <Navbar className="bg-component-blue navbar-dark" expand={'lg'} collapseOnSelect='true'>
//         <Container className="justify-content-start">
//           <Navbar.Brand className='work-sans d-none d-lg-block fs-1'>Vehicle Expenses Tracker</Navbar.Brand>
//           <Navbar.Toggle aria-controls="menu" />
//           <Navbar.Offcanvas
//             id="menu"
//             aria-labelledby="menuList"
//             placement="start"
//             className='bg-navbar-menu'
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title className='work-sans' id="menuList">Menu</Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav className="flex-grow-1 pe-3">
//                 <Nav.Link className='open-sans text-reset text-decoration-none' href="#garage">Garage</Nav.Link>
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//           <Navbar.Brand className='work-sans d-lg-none ms-3 fs-1'>{this.state.route}</Navbar.Brand>
//           <Navbar.Toggle aria-controls="addRecordToggle" />
//           <Navbar.Offcanvas
//             id="addRecordToggle"
//             aria-labelledby="addRecordForm"
//             placement="end"
//             className='bg-navbar-menu'
//           >
//             <Offcanvas.Body>
//               <Nav className="flex-grow-1 pe-3">
//                 <AddForm />
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>
//     );
//   }
// }

function Menu({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 d-none d-sm-block d-lg-none">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-grow-1 pe-3">
            <Nav.Link onClick={handleClose} className='open-sans text-reset text-decoration-none' href="#garage">Garage</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Form({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 d-none d-sm-block d-lg-none">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header placement='start' closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddForm vehicleId={props.vehicleId}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const Navigation = props => {
  return (
    <>
      <div className="navbar bg-component-blue">
        <div className="container p-0">
          <Navbar.Brand className='work-sans d-none d-lg-block fs-1 off-white-text'>Vehicle Expenses Tracker</Navbar.Brand>
          <Menu placement={'start'} name={'menu'} />
          {props.vehicleId && <Form placement={'end'} name={'record-form'} vehicleId={props.vehicleId} />}
        </div>
      </div>
    </>
  );
};
export default Navigation;
