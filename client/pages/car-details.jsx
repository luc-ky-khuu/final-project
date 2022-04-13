import React from 'react';

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
    const { carTitle } = this.state;
    return (
      <div className='container'>
        <h1 className='work-sans'>{carTitle}</h1>
      </div>
    );
  }
}

export default CarDetails;
