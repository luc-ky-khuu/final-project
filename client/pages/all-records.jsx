import React from 'react';

class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null
    };
  }

  componentDidMount() {
    fetch(`/api/vehicles/${this.props.vehicleId}/records`)
      .then(result => result.json())
      .then(result => {
        this.setState({
          records: result
        });
      })
      .catch(err => console.error(err));
  }
}

export default AllRecords;
