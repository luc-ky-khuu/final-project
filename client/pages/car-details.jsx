import React from 'react';
import { Card, Table } from 'react-bootstrap';

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carTitle: '',
      carPhoto: '',
      carRecords: []
    };
    this.makeTable = this.makeTable.bind(this);
  }

  componentDidMount() {
    fetch(`/api/garage/details/${this.props.vehicleId}`)
      .then(result => result.json())
      .then(result => {
        const { year, make, model, photoUrl } = result[0];
        this.setState({
          carTitle: `${year} ${make} ${model}`,
          carPhoto: photoUrl
        });
      });
    fetch(`/api/garage/recent-history/${this.props.vehicleId}`)
      .then(result => result.json())
      .then(result => {
        this.setState({
          carRecords: result
        });
      })
      .catch(err => console.error(err));
  }

  makeTable() {
    return this.state.carRecords.map((car, index) => {
      const { datePerformed, string_agg: name, mileage } = car;
      return (
        <tr key={index}>
          <td colSpan={1} className='text-start'>{datePerformed}</td>
          <td colSpan={2} className='text-start'>{name}</td>
          <td colSpan={1} className='text-end'>{mileage.toLocaleString()}</td>
        </tr>
      );
    });

  }

  render() {
    let { carTitle, carPhoto } = this.state;
    if (!carPhoto) {
      carPhoto = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <>
        <div className="row">
          <h1 className='py-3 work-sans fw-bold text-capitalize'>{carTitle}</h1>
        </div>
        <div className="row ">
          <Card.Img className='shadow p-0' src={carPhoto} alt="" />
        </div>
        <div className="row">
          <Table className='my-3 border rounded overflow-hidden' striped>
            <thead className=''>
              <tr className=''>
                <th colSpan={4} className='bg-secondary'>
                  <h2 className='text-start work-sans'>Recent Records</h2>
                </th>
              </tr>
            </thead>
            <tbody className='fs-4'>
              {this.state.carRecords.length > 0 ? this.makeTable() : <tr><td>No Records To Display</td></tr>}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default CarDetails;
