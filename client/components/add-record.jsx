import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class AddForm extends React.Component {

  render() {
    return (
      <>
        <Form className='col-4'>
          <Row className="">
            <Form.Group as={Col} controlId="date">
              <Form.Control type="date" placeholder="Date" />
            </Form.Group>
            <Form.Group as={Col} controlId="price">
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl placeholder='Price'aria-label="Amount (to the nearest dollar)" />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="maintenance">
            <Form.Control placeholder="Record" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mileage">
            <Form.Control placeholder="Mileage" />
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
