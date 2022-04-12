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
    const { year, make, model, photoUrl } = car;
    return (
      <>
        <Card className='flex-md-row-reverse align-items-center'>
          <Card.Img className='border border-dark' style={{ height: '20rem' }} variant="top" src={`${photoUrl}`} />
          <Card.Body >
            <Card.Title className="text-reset h1">{year} {make} {model}</Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  }

  render() {

    return (
      <div className='container'>
        {this.state.cars.map(car => this.renderCar(car))}
      </div>
    );
  }
}
export default MyCars;
