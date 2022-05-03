import React from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import CarForm from '../components/car-form';
import LoadingSpinner from '../components/loading-spinner';
class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      deleteModal: false,
      loaded: false
    };
    this.updateCars = this.updateCars.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.renderCars = this.renderCars.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  updateCars(newCars) {
    this.setState({
      cars: this.state.cars.concat([newCars])
    });
  }

  deleteCar() {
    const { cars, vehicleIndex } = this.state;
    fetch(`/api/garage/delete-car/${cars[vehicleIndex].vehicleId}`, {
      method: 'DELETE'
    })
      .then(result => result.json())
      .then(result => {
        const carsCopy = [...cars];
        carsCopy.splice(vehicleIndex, 1);
        this.setState({
          cars: carsCopy,
          deleteModal: false
        });
      })
      .catch(err => console.error(err));
  }

  toggleDeleteModal(index) {
    this.setState({
      deleteModal: !this.state.deleteModal,
      vehicleIndex: index
    });
  }

  deleteModal() {
    return (
      <>
         <Modal size='sm' centered show={this.state.deleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Body>
            <p className='fs-4 m-0'>
              Are you sure you want to remove this car?  This will delete all of your data.
            </p>
          </Modal.Body>
          <Modal.Footer className='work-sans'>
            <div className='col'>
              <Button variant='outline-dark' className='w-100 work-sans' onClick={this.toggleDeleteModal}>
                Cancel
              </Button>
            </div>
            <div className='col'>
              <Button variant='danger' className='w-100 border-0 red-button work-sans' onClick={this.deleteCar}>
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  getCars() {
    fetch('/api/garage')
      .then(cars => cars.json())
      .then(result => {
        this.setState({
          cars: result,
          loaded: true
        });
      });
  }

  renderCar(car, index) {
    let { year, make, model, photoUrl, vehicleId } = car;
    if (!photoUrl) {
      photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <li className='position-relative' key={vehicleId.toString()}>
        <a className='text-reset text-decoration-none' href={`#garage/myCar?vehicleId=${vehicleId}`}>
          <Card className='row flex-nowrap shadow-sm rounded my-3 mx-0 flex-md-row-reverse align-items-center'>
            <div className='col-md-9 p-0'>
              <Card.Img style={{ height: '20rem' }} variant='top' src={photoUrl} />
            </div>
            <Card.Body className='col-lg p-0'>
              <h1 className='work-sans h1 text-center text-capitalize m-3'>
                <span className='d-md-block'>{year} </span>
                <span className='d-md-block text-break'>{make} </span>
                <span className='d-md-block text-break'>{model}</span>
              </h1>
            </Card.Body>
          </Card>
        </a>
        <button onClick={() => this.toggleDeleteModal(index)} className='btn text-reset position-absolute trash-icon fs-3'>
          <i className='bi bi-trash-fill trash-icon'></i>
        </button>
      </li>
    );
  }

  renderCars() {
    return (<>
      <ul className='list-group list-group-flush list-unstyled'>
        {this.state.cars.length > 0 ? this.state.cars.map((car, index) => this.renderCar(car, index)) : <h3 className='text-center p-5'>No Cars To Display</h3>}
      </ul>
      <a href='#' className='text-reset'></a>
      <div>
        <CarForm updateCars={this.updateCars} newCar={true} />
      </div>
      <div>
        {this.deleteModal()}
      </div>
    </>
    );
  }

  render() {
    if (this.state.loaded) {
      return this.renderCars();
    } else {
      return (
        <LoadingSpinner />
      );
    }
  }
}
export default MyCars;
