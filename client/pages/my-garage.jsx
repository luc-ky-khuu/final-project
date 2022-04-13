import React from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      year: '',
      make: '',
      model: '',
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleModal(event) {
    event.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { year, make, model } = this.state;
    const carData = { year, make, model };
    fetch('/api/garage/add-car', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carData)
    })
      .then(res => res.json())
      .then(data => {
        this.getCars();
        this.setState({
          year: '',
          make: '',
          model: '',
          modal: !this.state.modal
        });
      })
      .catch(err => console.error(err));

  }

  carForm() {
    return (
      <>
        <a className='text-reset' href="#" onClick={this.toggleModal}>
          <i className="bi fs-1  bi-plus-circle-fill"></i>
        </a>
        <Modal size='sm' show={this.state.modal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicle</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <Form.Group className='mb-3' controlId='year'>
                <Form.Control value={this.state.year} onChange={this.handleChange} name='year' type='text' placeholder='Year'></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='make'>
                <Form.Control value={this.state.make} onChange={this.handleChange} name='make' type='text' placeholder='Make'></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='model'>
                <Form.Control value={this.state.model} onChange={this.handleChange} name='model' type='text' placeholder='Model'></Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
              <Button className='border-0 blue-button' type='submit'>
                Add Vehicle
              </Button>
              <Button className='border-0 red-button' onClick={this.toggleModal}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
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
    return (<>
        <ul className="list-group list-group-flush list-unstyled">
          {this.state.cars.length > 0 ? this.state.cars.map(car => this.renderCar(car)) : <h3 className='text-center p-5'>No Cars To Display</h3>}
        </ul>
        <a href='#' className='text-reset'></a>
        <div>
          {this.carForm()}
        </div>
      </>
    );
  }
}
export default MyCars;
