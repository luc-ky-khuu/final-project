import React from 'react';
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import VehicleContext from '../lib/vehicleContext-context';
class CarForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      modal: false,
      missingInput: false,
      newCar: this.props.newCar
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
  }

  addCarModal() {
    return (
      <>
        <Modal size='md' show={this.state.modal} onHide={this.toggleModal} centered>
          <Modal.Header>
            <Modal.Title className='work-sans'>{this.state.newCar ? 'Add Vehicle' : 'Edit Vehicle Info'}</Modal.Title>
            <CloseButton onClick={this.toggleModal}></CloseButton>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body className='open-sans'>
              <Form.Group className='mb-3' controlId='year'>
                <Form.Control
                  value={this.state.year}
                  onChange={this.handleChange}
                  name='year'
                  type='text'
                  {...(this.state.newCar && { placeholder: 'Year' })}>
                </Form.Control>
              </Form.Group>
              <Form.Group className='mb-3 text-capitalize' controlId='make'>
                <Form.Control
                  className='text-capitalize'
                  value={this.state.make}
                  onChange={this.handleChange}
                  name='make'
                  type='text'
                  {...(this.state.newCar && { placeholder: 'Make' })}>
                </Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='model'>
                <Form.Control
                  className='text-capitalize'
                  value={this.state.model}
                  onChange={this.handleChange}
                  name='model'
                  type='text'
                  {...(this.state.newCar && { placeholder: 'Model' })}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='photoUrl' className='mb-3'>
                <Form.Control
                  accept='.png, .jpg, .jpeg'
                  onChange={this.handleChange}
                  ref={this.fileInputRef}
                  name='photoUrl'
                  type='file'
                  />
              </Form.Group>
              {this.state.missingInput && <p className='text-danger m-0'>* Input Missing</p>}
            </Modal.Body>
            <Modal.Footer className='work-sans'>
              <div className='col'>
                <Button variant='outline-light' className='w-100 blue-button border-0 work-sans' type='submit'>
                  {this.state.newCar ? 'Add Vehicle' : 'Save Changes'}
                </Button>
              </div>
              <div className='col'>
                <Button variant='outline-light' className='w-100 border-0 red-button work-sans' onClick={this.toggleModal}>
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
    if (this.props.car) {
      const { year, make, model } = this.props.car;
      this.setState({
        year: year,
        make: make,
        model: model,
        modal: !this.state.modal
      });
    } else {
      this.setState({
        year: '',
        make: '',
        model: '',
        modal: !this.state.modal
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { year, make, model } = this.state;
    const formData = new FormData();
    formData.append('year', year);
    formData.append('make', make);
    formData.append('model', model);
    formData.append('photoUrl', this.fileInputRef.current.files[0]);
    const resetState = data => {
      this.props.updateCars(data);
      this.setState({
        year: '',
        make: '',
        model: '',
        modal: false
      });
      this.fileInputRef.current.value = null;
    };
    if (this.state.newCar) {
      if (!year || !make || !model) {
        this.setState({
          missingInput: true
        });
        return;
      }
      fetch('/api/garage/add-car', {
        method: 'POST',
        body: formData,
        headers: { 'X-Access-Token': this.context.token }
      })
        .then(res => res.json())
        .then(resetState)
        .catch(err => console.error(err));
    } else {
      fetch(`/api/garage/edit-car/${this.context.vehicleId}`, {
        method: 'PUT',
        body: formData,
        headers: { 'X-Access-Token': this.context.token }
      })
        .then(res => res.json())
        .then(resetState)
        .catch(err => console.error(err));
    }
  }

  render() {
    return (
     <>
        {this.state.newCar
          ? <a className='text-reset' href='#' onClick={this.toggleModal}>
          <i className='bi fs-1 bi-plus-circle-fill'></i>
        </a>
          : <a href='#' onClick={this.toggleModal} className='fs-3 edit-icon position-absolute text-reset'>
          <i className='bi bi-pencil-square icon-color'></i>
        </a>}
       {this.addCarModal()}
     </>
    );
  }
}
CarForm.contextType = VehicleContext;
export default CarForm;
