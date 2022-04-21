import React from 'react';
import Card from 'react-bootstrap/Card';
import CarForm from '../components/car-form';
class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
    this.updateCars = this.updateCars.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  updateCars(newCars) {
    this.setState({
      cars: this.state.cars.concat([newCars])
    });
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
          <CarForm updateCars={this.updateCars} newCar={true}/>
        </div>
      </>
    );
  }
}
export default MyCars;
