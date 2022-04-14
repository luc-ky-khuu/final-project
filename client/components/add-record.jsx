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

    const newRecord = { date, cost, record, mileage };
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
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
        <Form className='col-lg-5' onSubmit={this.handleSubmit} >
          <Row className="">
            <Form.Group as={Col} controlId="date">
              <Form.Control type="date" name='date' value={this.state.date} onChange={this.handleChange} placeholder="Date" />
            </Form.Group>
            <Form.Group as={Col} controlId="price">
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl placeholder='Price' name='cost' value={this.state.cost} onChange={this.handleChange} aria-label="Amount (to the nearest dollar)" />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="maintenance">
            <Form.Control name='record' placeholder="Record" value={this.state.record} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="mileage">
            <Form.Control name='mileage' placeholder="Mileage" value={this.state.mileage} onChange={this.handleChange}/>
          </Form.Group>
            {this.state.missingInput && <p className='text-danger'>* Input Missing</p>}
            <div className="modal-footer p-0 justify-content-between">
            <Button variant="primary" className='col-4 blue-button border-0 m-0' type="submit">
              Add
            </Button>
            <Button variant="primary" className='col-5 border-0 red-button m-0' onClick={this.reset}>
              Clear
            </Button>
            </div>
        </Form>
        </>
    );
  }
}

export default AddForm;
