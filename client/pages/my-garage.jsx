import React from 'react';
import { Card, Modal, Button, Form, CloseButton } from 'react-bootstrap';
class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      year: '',
      make: '',
      model: '',
      modal: false,
      missingInput: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.getCars();
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

  carForm() {
    return (
      <>
        <a className='text-reset' href="#" onClick={this.toggleModal}>
          <i className="bi fs-1 bi-plus-circle-fill"></i>
        </a>
        <Modal size='sm' show={this.state.modal} onHide={this.toggleModal} centered>
          <Modal.Header>
            <Modal.Title className='work-sans'>Add Vehicle</Modal.Title>
            <CloseButton onClick={this.toggleModal}></CloseButton>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body className='open-sans'>
              <Form.Group className='mb-3' controlId='year'>
                <Form.Control value={this.state.year} onChange={this.handleChange} name='year' type='text' placeholder='Year'></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='make'>
                <Form.Control value={this.state.make} onChange={this.handleChange} name='make' type='text' placeholder='Make'></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='model'>
                <Form.Control value={this.state.model} onChange={this.handleChange} name='model' type='text' placeholder='Model'></Form.Control>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
              </Form.Group>
              {this.state.missingInput && <p className='text-danger m-0'>* Input Missing</p>}
            </Modal.Body>
            <Modal.Footer className="work-sans">
                <div className="col">
                  <Button variant="outline-light" className='w-100 blue-button border-0 work-sans' type="submit">
                    Add Vehicle
                  </Button>
                </div>
                <div className="col">
                  <Button variant="outline-light" className='w-100 border-0 red-button work-sans' onClick={this.toggleModal}>
                    Close
                  </Button>
                </div>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleModal(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { year, make, model } = this.state;
    if (!year || !make || !model) {
      this.setState({
        missingInput: true
      });
      return;
    }
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

  renderCar(car) {
    let { year, make, model, photoUrl, vehicleId } = car;
    if (!photoUrl) {
      photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <li key={vehicleId.toString()}>
          <a className='text-reset text-decoration-none' href={`#garage/myCar?vehicleId=${vehicleId}`}>
          <Card className='row flex-nowrap shadow my-3 mx-0 flex-md-row-reverse align-items-center'>
            <div className="col-md-9 p-0">
              <Card.Img style={{ height: '20rem' }} variant="top" src={photoUrl} />
            </div>
            <Card.Body className='col-lg p-0'>
              <h1 className="work-sans h1 text-center text-capitalize m-3">
                <span className="d-md-block">{year} </span>
                <span className="d-md-block text-break">{make} </span>
                <span className="d-md-block text-break">{model}</span>
                </h1>
            </Card.Body>
          </Card>
          </a>
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
