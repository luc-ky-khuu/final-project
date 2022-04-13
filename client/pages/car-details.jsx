import React from 'react';

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carTitle: '',
      carRecords: []
    };

    this.getDetails = this.getDetails.bind(this);
  }

  getDetails() {
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
    return (
      <div onClick={this.getDetails}> Test Page </div>
    );
  }
}

export default CarDetails;
