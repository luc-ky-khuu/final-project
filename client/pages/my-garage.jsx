import React from 'react';
import Card from 'react-bootstrap/card';

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
    const { year, make, model, photoUrl, vehicleId } = car;
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
      </>
    );
  }
}
export default MyCars;
