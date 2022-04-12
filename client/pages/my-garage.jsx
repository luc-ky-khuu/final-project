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
      <li>
        <Card key={vehicleId.toString()} className='shadow m-3 car-card flex-md-row-reverse align-items-center'>
          <Card.Img className='' style={{ height: '20rem' }}variant="top" src={`${photoUrl}`} />
          <Card.Body className=''>
            <h1 className="text-reset h1 text-center">{year} {make} {model}</h1>
          </Card.Body>
        </Card>
      </li>
    );
  }

  render() {

    return (<>
      <ul className="list-group list-group-flush">
          {this.state.cars.map(car => this.renderCar(car))}
        </ul>
      </>
    );
  }
}
export default MyCars;
