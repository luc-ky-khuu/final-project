import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missingInput: false,
      date: '',
      cost: '',
      record: '',
      mileage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { date, cost, record, mileage } = this.state;
    if (!date || !cost || !record || !mileage) {
      this.setState({
        missingInput: true
      });
      return;
    }

    const newRecord = { date, cost, record, mileage, vehicleId: this.props.vehicleId };
    fetch(`/api/garage/add-record/${this.props.vehicleId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecord)
    })
      .then(result => result.json())
      .then(data => {
        this.reset();
        this.props.toggleModal();
        this.props.addRecord(data);
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      missingInput: false
    });
  }

  reset() {
    this.setState({
      missingInput: false,
      date: '',
      cost: '',
      record: '',
      mileage: ''
    });
  }

  render() {
    return (
      <>
        <Form className='bg-white p-3 rounded' onSubmit={this.handleSubmit} >
          <h3 className='work-sans'>Add Record</h3>
          <Form.Group className='mb-3' controlId='date'>
            <Form.Control type='date' name='date' value={this.state.date} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='maintenance'>
            <Form.Control name='record' placeholder='Record' value={this.state.record} onChange={this.handleChange}/>
          </Form.Group>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='mileage'>
              <Form.Control name='mileage' placeholder='Mileage' value={this.state.mileage} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='price'>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl placeholder='Price' name='cost' value={this.state.cost} onChange={this.handleChange} aria-label='Amount (to the nearest dollar)' />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className='justify-content-between'>
            {this.state.missingInput && <p className='text-danger'>* Input Missing</p>}
            <div className='col'>
              <Button variant='outline-light' className='w-100 fs-5 blue-button border-0 work-sans' type='submit'>
                Add
              </Button>
            </div>
            <div className='col'>
              <Button variant='outline-light' className='w-100 fs-5 border-0 red-button work-sans' onClick={this.reset}>
                Clear
              </Button>
            </div>
          </Row>
        </Form>
        </>
    );
  }
}
export default AddForm;
