import React from 'react';

class MyCars extends React.Component {
  constructor(props) {
    super(props);
    this.loadCars = this.loadCars.bind(this);
  }

  loadCars() {
    fetch('/api/garage')
      .then(cars => cars.json())
      .then(result => result);
  }

  render() {
    return (
      <div>{this.loadCars()}</div>
    );
  }
}

export default MyCars;
