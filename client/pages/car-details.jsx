import React from 'react';
import { Card, Modal, Table } from 'react-bootstrap';
import AddForm from '../components/add-record';
class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
      modal: false
    };
    this.makeTable = this.makeTable.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    fetch(`/api/garage/recent-history/${this.props.vehicleId}`)
      .then(result => result.json())
      .then(result => {
        this.setState({
          car: result
        });
      })
      .catch(err => console.error(err));
  }

  combineSameDayRecords(records) {
    const newArr = [];
    let newObj = {
      datePerformed: records[0].datePerformed,
      maintenanceName: records[0].maintenanceName,
      mileage: records[0].mileage
    };
    for (let i = 1; i < records.length; i++) {
      if (newObj.datePerformed === records[i].datePerformed) {
        newObj.datePerformed = records[i].datePerformed;
        newObj.maintenanceName += `, ${records[i].maintenanceName}`;
        newObj.mileage = records[i].mileage;
      } else {
        newArr.push(newObj);
        newObj = {
          datePerformed: records[i].datePerformed,
          maintenanceName: records[i].maintenanceName,
          mileage: records[i].mileage
        };
      }

    }
    newArr.push(newObj);
    return newArr;
  }

  makeTable() {
    const combinedRecords = (this.combineSameDayRecords(this.state.car.records));
    const firstFourRecords = combinedRecords.slice(0, 4);
    return firstFourRecords.map((car, index) => {
      const { datePerformed, maintenanceName: name, mileage } = car;
      return (
        <tr key={index} className='open-sans'>
          <td className='col-4 text-start'>{datePerformed}</td>
          <td colSpan={2} className='text-start'>{name}</td>
          <td className='text-end'>{mileage.toLocaleString()}</td>
        </tr>
      );
    });
  }

  showAddForm() {
    return (
      <Modal size='md' show={this.state.modal} onHide={this.toggleModal} centered>
        <AddForm vehicleId={this.props.vehicleId} toggleModal={this.toggleModal} getHistory={this.getHistory}/>
      </Modal>
    );
  }

  toggleModal(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let { year, make, model, photoUrl } = this.state.car;
    if (!photoUrl) {
      photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <>
        <div className="row my-3 rounded overflow-hidden">
            <div className="col-lg-11">
            <h1 className='py-3 work-sans fw-bold text-capitalize'>{year} {make} {model}</h1>
            <Card.Img className='shadow p-0 mb-3' src={photoUrl} alt="" />
            <div className='m-0 overflow-hidden rounded'>
              <div className="row py-2 mx-0 bg-navbar-menu">
                <h2 className='col text-start'>Recent Records</h2>
                <div className="col text-end">
                  <a href="" onClick={this.toggleModal} className='text-reset'><i className="fs-3 bi bi-plus-circle pe-2"></i></a>
                </div>
              </div>
              <Table hover striped>
                <tbody className='fs-4'>
                  {this.state.car.records && this.state.car.records.length > 0 ? this.makeTable() : <tr className='disabled'><td colSpan={4}>No Records To Display</td></tr>}
                </tbody>
              </Table>
           </div>
            </div>
          <div>
            {this.showAddForm()}
          </div>
        </div>
      </>
    );
  }
}

export default CarDetails;
