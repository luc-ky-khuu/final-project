import React from 'react';
import Card from 'react-bootstrap/Card';

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carTitle: '',
      carRecords: []
    };
  }

  componentDidMount() {
    fetch(`/api/garage/${this.props.vehicleId}`)
      .then(result => result.json())
      .then(result => {
        this.setState({
          carTitle: result[0].concat,
          carRecords: result
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { carTitle, carRecords } = this.state;
    if (!carRecords.photoUrl) {
      carRecords.photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <>
        <div className="row">
          <h1 className='work-sans text-capitalized'>{carTitle}</h1>
        </div>
        <div className="row ">
          <Card.Img className='shadow p-0' src={carRecords.photoUrl} alt="" />
        </div>
      </>
    );
  }
}

export default CarDetails;
