import React from 'react';
import { Card, Modal, Table } from 'react-bootstrap';
import AddForm from '../components/add-record';
class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
      modal: false,
      records: null
    };
    this.makeTable = this.makeTable.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getNextOilChange = this.getNextOilChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/garage/recent-history/${this.props.vehicleId}`)
      .then(result => result.json())
      .then(result => {
        this.setState({
          car: result,
          records: result.records
        });
      })
      .catch(err => console.error(err));
  }

  addRecord(data) {
    const splitDate = data[0].datePerformed.split('T');
    data[0].datePerformed = splitDate[0];
    const newRecord = data.concat(this.state.records);
    this.setState({
      records: newRecord
    });
  }

  getNextOilChange() {
    const { records } = this.state;
    if (!this.state.records) {
      return;
    }
    for (let i = 0; i < records.length; i++) {
      if (records[i].maintenanceName.toLowerCase().includes('oil')) {
        return records[i].mileage + 3000;
      }
    }
  }

  calculateTotalCost() {
    const { records } = this.state;
    let total = 0;
    if (!this.state.records) {
      return;
    }
    for (let i = 0; i < records.length; i++) {
      total += records[i].cost;
    }
    return total;
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
    const { records } = this.state;
    const combinedRecords = (this.combineSameDayRecords(records));
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
        <AddForm vehicleId={this.props.vehicleId} toggleModal={this.toggleModal} addRecord={this.addRecord}/>
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
    const nextOilChange = this.getNextOilChange();
    const totalCost = this.calculateTotalCost();
    let { year, make, model, photoUrl } = this.state.car;
    if (!photoUrl) {
      photoUrl = 'https://proximaride.com/images/car_placeholder2.png';
    }
    return (
      <>
        <div className="row mt-3 rounded overflow-hidden">
          <div className="col-lg-12">
            <h1 className='py-3 work-sans fw-bold text-capitalize'>{year} {make} {model}</h1>
            <div className="row mb-3">
              <div className="col-lg-9 mb-lg-0 mb-3">
                <Card.Img className='h-100 shadow p-0 rounded' src={photoUrl} alt="" />
              </div>
              <div className='col-lg-3 d-flex ps-lg-0'>
                <div className="d-flex flex-lg-wrap w-100 gap-3">
                  <div className='col-lg-12 w-100 shadow'>
                    <Card className='fill border-0'>
                      <Card.Header className='m-0 row bg-navbar-menu work-sans px-0 '>
                        <h4 className='m-auto widget-title'>
                          Next Oil Change
                        </h4>
                      </Card.Header>
                      <Card.Body className='row body-sans widget-body-text p-0' >
                        <p className='m-auto py-4 py-lg-0'>
                          {nextOilChange ? nextOilChange.toLocaleString() + ' Miles' : 'No Past Oil Changes'}
                        </p>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-lg-12 w-100 shadow'>
                    <Card className='fill border-0'>
                      <Card.Header className='m-0 row bg-navbar-menu work-sans widget-title'>
                        <h4 className='m-auto widget-title px-4'>
                          Total Cost
                        </h4>
                      </Card.Header>
                      <Card.Body className='row body-sans widget-body-text py-lg-0 py-4'>
                        <p className='m-auto py-lg-0 py-4'>
                          {totalCost ? `$${totalCost.toLocaleString()}` : 'No Records to Calculate'}
                        </p>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row m-0 overflow-hidden rounded'>
          <div className="row py-2 mx-0 bg-navbar-menu">
            <h2 className='col text-start'>Recent Records</h2>
            <div className="col text-end">
              <a href="" onClick={this.toggleModal} className='text-reset'><i className="fs-3 bi bi-plus-circle pe-2"></i></a>
            </div>
          </div>
          <Table striped>
            <tbody className='fs-4'>
              {this.state.records && this.state.records.length > 0 ? this.makeTable() : <tr className='disabled'><td colSpan={4}>No Records To Display</td></tr>}
              <tr>
                <td colSpan={5}>
                  <a className='text-reset text-decoration-none' href={`#vehicle-records?vehicleId=${this.props.vehicleId}`}>View All Records</a>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          {this.showAddForm()}
        </div>
      </>
    );
  }
}

export default CarDetails;
