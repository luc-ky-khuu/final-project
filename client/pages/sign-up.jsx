import React from 'react';
import { Form, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      didSignUp: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const info = {
      username: username,
      password: password
    };
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    })
      .then(result => result.json())
      .then(userInfo => {
        if (!userInfo[0]) {
          this.setState({
            didSignUp: false
          });
        } else {
          this.setState({
            didSignUp: true
          });
          this.reset();
        }
      })
      .catch(err => console.error(err));
  }

  reset() {
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <>
        <h3 className='m-5'>
          Sign Up For An Account
        </h3>
        <div className='d-flex row justify-content-center'>
          <Form className='w-50 p-5 bg-white' onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3 text-start" controlId="newUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.username} type="text" name='username' placeholder="Enter username" />
              {this.state.didSignUp === false &&
                <p className='text-danger text-start'>
                  Username already exists, please make another
                </p>
              }
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="newPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.password} type="password" name='password' placeholder="Password" />
            </Form.Group>
            {this.state.didSignUp === true &&
              <p className='text-success text-start'>
                Successfully Signed Up!
              </p>
            }
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
