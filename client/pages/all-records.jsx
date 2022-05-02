import React from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';
import LoadingSpinner from '../components/loading-spinner';
class AllRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      loaded: false,
      recordToEdit: null,
      editRecordName: null,
      editRecordCost: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
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
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event, record, recordIndex, accIndex) {
    event.preventDefault();
    const { editRecordName, editRecordCost, records } = this.state;
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
    this.setState({
      records: newRecords
    });
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
      .then(result => this.reset())
      .catch(err => console.error(err));
  }

  reset() {
    this.setState({
      recordToEdit: null
    });
  }

  displayRecordsList() {
    const { records, recordToEdit } = this.state;
    return (
      <Accordion className='mt-3 mt-lg-0' defaultActiveKey={0}>
        {
      records.map((record, accIndex) => {
        return (
        <Accordion.Item key={accIndex} eventKey={accIndex}>
          <Accordion.Header>
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
          </Accordion.Header>
          <Accordion.Body>
              {
                record.names.map((name, recordIndex) => {
                  return (
                    <Form className='text-capitalize row fs-4 ms-5'
                          id={`${record.datePerformed} ${recordIndex}`} key={recordIndex}
                          onSubmit={event => this.handleSubmit(event, record, recordIndex, accIndex)}
                          >
                        <p className='col-1 ps-3 border-start border-secondary m-0'></p>
                        <p className='col-6 text-start m-0 p-3 text-truncate'>
                          {recordToEdit === `${record.datePerformed} ${recordIndex}`
                            ? <Form.Control
                            className='text-capitalize'
                            type='name'
                            name='editRecordName'
                            value={this.state.editRecordName}
                            onChange={this.handleChange}>
                            </Form.Control>
                            : name
                          }
                        </p>
                        <p className='col-4 m-0 p-3 text-end'>
                        {recordToEdit === `${record.datePerformed} ${recordIndex}`
                          ? <Form.Control
                            className='text-capitalize'
                            type='name'
                            name='editRecordCost'
                            value={this.state.editRecordCost}
                            onChange={this.handleChange}>
                          </Form.Control>
                          : `$${record.cost[recordIndex].toLocaleString()}`
                        }
                        </p>
                      <p className='col-1 m-0 p-0 align-self-center'>
                        <a className='btn fs-4' onClick={() => this.editRecord(record, recordIndex)}><i className="bi bi-pencil-square"></i></a>
                      </p>
                    </Form>
                  );
                })
              }
              <div className='text-capitalize row fs-3 ms-5'>
                <p className='col-11 m-0 p-3 text-end'>
                  {this.state.recordToEdit !== null
                    ? <>
                      <Button variant='outline-light' className='border-0 work-sans blue-button me-3' type='submit' form={this.state.recordToEdit}>Save</Button>
                      <Button variant='outline-light' className='border-0 work-sans red-button' onClick={() => this.setState({ recordToEdit: null })}>Cancel</Button>
                      </>
                    : <>
                        <span className='fw-bolder'>Total: </span> ${parseInt(record.total).toLocaleString()}
                      </>}
                </p>
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
