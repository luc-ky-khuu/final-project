import React from 'react';
import Card from 'react-bootstrap/card';

class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      photoUrl: ''
    };
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    fetch('/api/garage')
      .then(cars => cars.json())
      .then(result => {
        const { year, make, model, photoUrl } = result[0];
        return this.setState({
          year,
          make,
          model,
          photoUrl
        });

      });
  }

  render() {
    const { photoUrl } = this.state;
    return (
      <div className='container'>
        <Card className='flex-md-row-reverse align-items-center'>
          <Card.Img className='border border-dark' style={{ height: '20rem' }} variant="top" src={`${photoUrl}`} />
          <Card.Body >
            <Card.Title>Card Title</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default MyCars;
