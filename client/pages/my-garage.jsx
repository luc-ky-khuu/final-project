import React, { useState } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';

function CarForm(form) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = event => {
    event.preventDefault();
    setShow(true);
  };
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <>
      <a className='text-reset' href="#" onClick={handleShow}>
        <i className="bi fs-1  bi-plus-circle-fill"></i>
      </a>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='year'>
              <Form.Control type='text' placeholder='Year'></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='make'>
              <Form.Control type='text' placeholder='Make'></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='model'>
              <Form.Control type='text' placeholder='Model'></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    this.getCars();
  }

  toggleForm(show) {

  }

  getCars() {
    fetch('/api/garage')
      .then(cars => cars.json())
      .then(result => {
        this.setState({
          cars: result
        });
      });
  }

  renderCar(car) {
    let { year, make, model, photoUrl, vehicleId } = car;
    if (!photoUrl) {
      photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <li key={vehicleId.toString()}>
          <Card className='shadow my-3 car-card flex-md-row-reverse align-items-center'>
            <Card.Img className='' style={{ height: '20rem' }} variant="top" src={`${photoUrl}`} />
            <Card.Body className=''>
              <h1 className="work-sans text-reset h1 text-center">{year} {make} {model}</h1>
            </Card.Body>
          </Card>
        </li>
    );
  }

  render() {

    return (<>
        <ul className="list-group list-group-flush list-unstyled">
          {this.state.cars.length > 0 ? this.state.cars.map(car => this.renderCar(car)) : <h3 className='text-center p-5'>No Cars To Display</h3>}
        </ul>
        <a href='#' className='text-reset'></a>
        <div>
          <CarForm />
        </div>
      </>
    );
  }
}
export default MyCars;
