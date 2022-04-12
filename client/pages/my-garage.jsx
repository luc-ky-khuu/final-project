import React, { useState } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';

function CarForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = event => setShow(false);
  const handleShow = event => setShow(true);
  const handleSubmit = event => {
    event.preventDefault();

    handleClose();
  };

  return (
    <>
      <a className='text-reset' href="#" onClick={handleShow}>
        <i className="bi fs-1  bi-plus-circle-fill"></i>
      </a>
      <Modal size='sm' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {props.form}
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button className='border-0 blue-button' type='submit' onClick={handleClose}>
              Add Vehicle
            </Button>
            <Button className='border-0 red-button' onClick={handleClose}>
              Close
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
      cars: [],
      year: '',
      make: '',
      model: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  formInput() {
    return (
      <>
        <Form.Group className='mb-3' controlId='year'>
          <Form.Control onChange={this.handleChange} name='year' type='text' placeholder='Year'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='make'>
          <Form.Control onChange={this.handleChange} name='make' type='text' placeholder='Make'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='model'>
          <Form.Control onChange={this.handleChange} name='model' type='text' placeholder='Model'></Form.Control>
        </Form.Group>
      </>
    );
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
    const { year, make, model } = this.state;
    const carValues = { year, make, model };
    return (<>
        <ul className="list-group list-group-flush list-unstyled">
          {this.state.cars.length > 0 ? this.state.cars.map(car => this.renderCar(car)) : <h3 className='text-center p-5'>No Cars To Display</h3>}
        </ul>
        <a href='#' className='text-reset'></a>
        <div>
          <CarForm form={this.formInput()} stateValues={carValues}/>
        </div>
      </>
    );
  }
}
export default MyCars;
