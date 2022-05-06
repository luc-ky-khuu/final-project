import React from 'react';
import { Form, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  render() {
    return (
      <>
        <h3 className='m-5'>
          Sign Up For An Account
        </h3>
        <div className='d-flex row justify-content-center'>
          <Form className='w-50 p-5 bg-white'>
            <Form.Group className="mb-3 text-start" controlId="newUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.onChange} type="text" name='username' placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="newPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.onChange} type="password" name='password' placeholder="Password" />
            </Form.Group>
            <Button className='w-100' variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default SignUp;
