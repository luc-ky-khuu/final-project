import React from 'react';
import { Accordion, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import LoadingSpinner from '../components/loading-spinner';
import Context from '../lib/vehicleContext-context';
class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loaded: false,
      recordToEdit: null,
      editRecordName: null,
      editRecordCost: null,
      editRecordDate: null,
      missingInput: false,
      deleteModal: false,
      receiptModal: false,
      pictureToDisplay: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.reset = this.reset.bind(this);
    this.displayReceipts = this.displayReceipts.bind(this);
    this.toggleReceiptModal = this.toggleReceiptModal.bind(this);
  }

  componentDidMount() {
    const { vehicleId, user } = this.context;
    fetch(`/api/vehicles/${vehicleId}/${user.userId}/records`, {
      headers: { 'X-Access-Token': localStorage.getItem('vehicle-expenses-tracker-jwt') }
    })
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          this.setState({
            error: result.error
          });
        } else {
          this.setState({
            records: result,
            loaded: true
          });
        }
      })
      .catch(err => console.error(err));
  }

  editRecord(record, recordIndex) {
    this.setState({
      recordToEdit: `${record.datePerformed} ${recordIndex}`,
      editRecordDate: record.datePerformed,
      editRecordName: record.names[recordIndex],
      editRecordCost: record.cost[recordIndex]
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      missingInput: false
    });
  }

  handleSubmit(event, record, recordIndex, accIndex) {
    event.preventDefault();
    let { editRecordName, editRecordCost, records } = this.state;
    const { vehicleId } = this.context;
    if (!editRecordName || !editRecordCost) {
      this.setState({
        missingInput: '* Entries Cannot Be Empty'
      });
      return;
    }
    if (editRecordCost.includes(',')) {
      editRecordCost = editRecordCost.replace(/,/g, '');
    }
    if (isNaN(editRecordCost)) {
      this.setState({
        missingInput: '* "Cost" Must Only Contain Numbers'
      });
      return;
    }
    const updatedRecords = {
      date: record.datePerformed,
      oldName: record.names[recordIndex],
      oldCost: record.cost[recordIndex],
      newName: editRecordName,
      newCost: editRecordCost
    };
    const newRecords = [...records];
    const { names, cost } = newRecords[accIndex];
    newRecords[accIndex].total = (parseInt(records[accIndex].total) - parseInt(record.cost[recordIndex])) + parseInt(editRecordCost);
    names[recordIndex] = editRecordName;
    cost[recordIndex] = editRecordCost;
    fetch(`/api/garage/${vehicleId}/edit-records`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('vehicle-expenses-tracker-jwt')
        },
        body: JSON.stringify(updatedRecords)
      }
    )
      .then(result => result.json())
      .then(result => this.reset(newRecords))
      .catch(err => console.error(err));
  }

  displayRecordsList() {
    const { records, recordToEdit, editRecordCost, editRecordName, missingInput } = this.state;
    return (
      <Accordion className='mt-3 mt-lg-0' defaultActiveKey={0}>
        <Accordion.Item className="px-3" disabled={true}>
          {
            <div className='row fs-5 w-100 h-50'>
              <div className='col-4'>
                <p className='text-start fw-bolder m-lg-3 m-0'>
                  Date
                </p>
              </div>
              <div className='col-5'>
                <p className='text-start m-lg-3 fw-bolder m-0 text-capitalize'>
                  Description
                </p>
              </div>
              <div className='col-3 pe-4'>
                <p className='text-end m-lg-3 fw-bolder  m-0'>
                  Mileage
                </p>
              </div>
            </div>
          }
          </Accordion.Item>
        {
          records.map((record, accIndex) => {
            return (
              <Accordion.Item key={accIndex} eventKey={accIndex}>
                <Accordion.Button disabled={recordToEdit}>
                  {
                    <div className='row fs-5 w-100'>
                      <div className='col-4'>
                        <p className='text-start m-lg-3 m-0'>
                          {record.datePerformed}
                        </p>
                      </div>
                      <div className='col-5'>
                        <p className='text-start m-lg-3 m-0 text-capitalize'>
                          {record.names.join(', ')}
                        </p>
                      </div>
                      <div className='col-3 pe-4'>
                        <p className='text-end m-lg-3 m-0'>
                          {record.mileage.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  }
                </Accordion.Button>
                <Accordion.Body>
                    {
                      record.names.map((name, recordIndex) => {
                        return (
                          <Form className='text-capitalize row fs-4 ms-lg-5 ms-0'
                            id={`${record.datePerformed} ${recordIndex}`} key={recordIndex}
                            onSubmit={event => this.handleSubmit(event, record, recordIndex, accIndex)}>
                            <div className='col-1 ps-3 border-start border-secondary m-0'></div>
                            <div className='col-6 text-start m-0 p-3 text-truncate'>
                              {recordToEdit === `${record.datePerformed} ${recordIndex}`
                                ? <Form.Control
                                    className='text-capitalize fs-5'
                                    type='name'
                                    name='editRecordName'
                                    value={editRecordName}
                                    onChange={this.handleChange}>
                                  </Form.Control>
                                : name
                              }
                            </div>
                            <div className='col-lg-4 col-3 m-0 text-end p-3'>
                              {recordToEdit === `${record.datePerformed} ${recordIndex}`
                                ? <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                      className='text-capitalize fs-5'
                                      type='name'
                                      name='editRecordCost'
                                      value={editRecordCost}
                                      onChange={this.handleChange}>
                                    </Form.Control>
                                  </InputGroup>
                                : `$${parseInt(record.cost[recordIndex]).toLocaleString()}`
                              }
                            </div>
                            <div className='col-1 m-0 p-0 align-self-center'>
                              {!recordToEdit && <a className='btn fs-4' onClick={() => this.editRecord(record, recordIndex)}><i className="bi bi-pencil-square"></i></a>}
                              {recordToEdit === `${record.datePerformed} ${recordIndex}` && <a className='btn fs-4 text-danger' onClick={() => this.setState({ recordToEdit: null, missingInput: false })}><i className="bi bi-x-square"></i></a>}
                            </div>
                            {recordToEdit === `${record.datePerformed} ${recordIndex}` && this.deleteModal(record, recordIndex, accIndex)}
                          </Form>
                        );
                      })
                    }
                    <div className='text-capitalize row fs-3 ms-lg-5 mt-3'>
                    {missingInput && <p className='fs-5 col-lg-11 col-10 m-0 p-3 text-end text-danger'>{missingInput}</p>}
                    <div className='col-lg-7 col-6'>
                        {record.receipt[0] && this.displayReceipts(record)}
                      </div>
                      <div className='col-lg-4 col-5 m-0 p-3 text-end'>
                        {recordToEdit !== null
                          ? <>
                            <Button variant='outline-light' className='border-0 work-sans blue-button me-3' type='submit' form={recordToEdit}>Save</Button>
                            <Button variant='outline-light' className='border-0 work-sans red-button' onClick={this.toggleDeleteModal}>Delete</Button>
                            </>
                          : <>
                              <span className='fw-bolder'>Total: </span> ${parseInt(record.total).toLocaleString()}
                            </>}
                      </div>
                    </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
      </Accordion>
    );
  }

  deleteRecord(record, recordIndex, accIndex) {
    const { vehicleId } = this.context;
    const recordToDelete = {
      date: record.datePerformed,
      cost: record.cost[recordIndex],
      name: record.names[recordIndex]
    };
    fetch(`/api/garage/${vehicleId}/delete-record`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('vehicle-expenses-tracker-jwt')
        },
        body: JSON.stringify(recordToDelete)
      })
      .then(result => result.json())
      .then(result => {
        const newRecords = [...this.state.records];
        newRecords[accIndex].names.splice(recordIndex, 1);
        newRecords[accIndex].cost.splice(recordIndex, 1);
        newRecords[accIndex].total = parseInt(newRecords[accIndex].total) - parseInt(recordToDelete.cost);
        if (newRecords[accIndex].names.length === 0) {
          newRecords.splice(accIndex, 1);
        }
        this.reset(newRecords);
      })
      .catch(err => console.error(err));
  }

  deleteModal(record, recordIndex, accIndex) {
    return (
      <>
        <Modal size='sm' centered show={this.state.deleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Body>
            <p className='fs-4 m-0'>
              Are you sure you want to remove this record?
            </p>
          </Modal.Body>
          <Modal.Footer className='work-sans'>
            <div className='col'>
              <Button variant='outline-dark' className='w-100 work-sans' onClick={this.toggleDeleteModal}>
                Cancel
              </Button>
            </div>
            <div className='col'>
              <Button variant='danger' className='w-100 border-0 red-button work-sans' onClick={() => this.deleteRecord(record, recordIndex, accIndex)}>
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  displayReceipts(record) {
    return (
      <div className="row flex-nowrap gap-2 receipt-container">
        {
          record.receipt.map((receipt, index) => {
            return (
              <button key={receipt} className='receipt border border-dark btn h-100 col-2'>
                  <img className='receipt' src={receipt} onClick={this.toggleReceiptModal}></img>
                  {this.receiptModal(receipt)}
              </button>
            );
          })
        }
      </div>
    );
  }

  receiptModal() {
    return (
      <>
        <Modal centered show={this.state.receiptModal} onHide={() => this.toggleReceiptModal()}>
            <img className='h-50' src={this.state.pictureToDisplay}></img>
        </Modal>
      </>
    );
  }

  toggleReceiptModal(event) {
    if (!event) {
      this.setState({
        receiptModal: !this.state.receiptModal
      });
    } else {
      this.setState({
        receiptModal: !this.state.receiptModal,
        pictureToDisplay: event.target.src
      });
    }
  }

  toggleDeleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  reset(newRecords) {
    this.setState({
      records: newRecords,
      recordToEdit: null,
      editRecordCost: null,
      editRecordName: null,
      editRecordDate: null,
      missingInput: false,
      deleteModal: false
    });
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <div className='mt-4'>
            <h1>Sorry! Something Went Wrong.</h1>
            <h1>{this.state.error}</h1>
          </div>
        </>
      );
    } else if (this.state.loaded) {
      return (
        <>
          <h1 className='m-3 d-lg-block d-none'>Vehicle Records</h1>
          {this.state.records.length > 0 && this.state.records ? this.displayRecordsList() : <p>no records</p>}
        </>
      );
    } else {
      return (
        <LoadingSpinner />
      );
    }
  }
}
AllRecords.contextType = Context;
export default AllRecords;
