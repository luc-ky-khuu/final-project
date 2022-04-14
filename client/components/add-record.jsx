import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      cost: '',
      record: '',
      mileage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { date, cost, record, mileage } = this.state;
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
        this.setState({
          date: '',
          cost: '',
          record: '',
          mileage: ''
        });
      })
      .catch(err => console.error(err));

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <>
        <Form className='col-4' onSubmit={this.handleSubmit} >
          <Row className="">
            <Form.Group as={Col} controlId="date">
              <Form.Control type="date" name='date' onChange={this.handleChange} placeholder="Date" />
            </Form.Group>
            <Form.Group as={Col} controlId="price">
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl placeholder='Price' name='cost' onChange={this.handleChange} aria-label="Amount (to the nearest dollar)" />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="maintenance">
            <Form.Control name='record' placeholder="Record" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="mileage">
            <Form.Control name='mileage' placeholder="Mileage" onChange={this.handleChange}/>
          </Form.Group>

            <div className="modal-footer p-0 justify-content-between">
            <Button variant="primary" className='col-4 blue-button border-0 m-0' type="submit">
              Add
            </Button>
            <Button variant="primary" className='col-5 border-0 red-button m-0'>
              Clear Form
            </Button>
            </div>
        </Form>
        </>
    );
  }
}

export default AddForm;
