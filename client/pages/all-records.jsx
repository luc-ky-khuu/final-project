import React from 'react';
import { Accordion, Form, Button, InputGroup } from 'react-bootstrap';
import LoadingSpinner from '../components/loading-spinner';
class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loaded: false,
      recordToEdit: null,
      editRecordName: null,
      editRecordCost: null,
      missingInput: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/vehicles/${this.props.vehicleId}/records`)
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
    const { editRecordName, editRecordCost, records } = this.state;
    if (!editRecordName || !editRecordCost) {
      this.setState({
        missingInput: '* Entries Cannot Be Empty'
      });
      return;
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
    fetch(`/api/garage/${this.props.vehicleId}/edit-records`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecords)
      }
    )
      .then(result => result.json())
      .then(result => this.setState({
        records: newRecords,
        recordToEdit: null,
        missingInput: false
      }))
      .catch(err => console.error(err));
  }

  displayRecordsList() {
    const { records, recordToEdit } = this.state;
    return (
      <Accordion className='mt-3 mt-lg-0' defaultActiveKey={0}>
        {
          records.map((record, accIndex) => {
            return (
              <Accordion.Item key={accIndex} eventKey={accIndex}>
                <Accordion.Button disabled={this.state.recordToEdit}>
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
                                    value={this.state.editRecordName}
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
                                      value={this.state.editRecordCost}
                                      onChange={this.handleChange}>
                                    </Form.Control>
                                  </InputGroup>
                                : `$${record.cost[recordIndex].toLocaleString()}`
                              }
                            </div>
                            <div className='col-1 m-0 p-0 align-self-center'>
                              {!this.state.recordToEdit && <a className='btn fs-4' onClick={() => this.editRecord(record, recordIndex)}><i className="bi bi-pencil-square"></i></a>}
                            </div>
                          </Form>
                        );
                      })
                    }
                    <div className='text-capitalize row fs-3 ms-lg-5'>
                    {this.state.missingInput && <p className='fs-5 col-lg-11 col-10 m-0 p-3 text-end text-danger'>{this.state.missingInput}</p>}
                      <div className='col-lg-11 col-10 m-0 p-3 text-end'>
                        {this.state.recordToEdit !== null
                          ? <>
                            <Button variant='outline-light' className='border-0 work-sans blue-button me-3' type='submit' form={this.state.recordToEdit}>Save</Button>
                            <Button variant='outline-light' className='border-0 work-sans red-button' onClick={() => this.setState({ recordToEdit: null, missingInput: false })}>Cancel</Button>
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

export default AllRecords;
