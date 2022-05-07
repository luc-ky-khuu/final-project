import React from 'react';
import { Form, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      badName: null,
      goodPwLength: null,
      pwHasNum: null,
      pwHasUpper: null,
      pwHasLower: null,
      didSignUp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (this.state.badName) {
      if (event.target.value.length >= 6 && event.target.name === 'username') {
        this.setState({
          badName: null
        });
      }
    }
    if (!this.state.goodPwLength) {
      if (event.target.value.length >= 6 && event.target.name === 'password') {
        this.setState({
          goodPwLength: true
        });
      }
    }
    if (event.target.name === 'password' && event.nativeEvent.data) {
      const char = event.nativeEvent.data.charCodeAt(0);
      if (char >= 97 && char <= 122) {
        this.setState({
          pwHasLower: true
        });
      }
      if (char >= 65 && char <= 90) {
        this.setState({
          pwHasUpper: true
        });
      }
      if (char >= 48 && char <= 57) {
        this.setState({
          pwHasNum: true
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password, pwHasUpper, pwHasLower, pwHasNum } = this.state;
    if (username.length < 6 || password.length < 6 || !(pwHasUpper || pwHasLower || pwHasNum)) {
      if (username.length < 6) {
        this.setState({
          badName: 'Username must be at least 6 characters long'
        });
      }
      if (password.length < 6) {
        this.setState({
          goodPwLength: false
        });
      }
      if (!pwHasUpper) {
        this.setState({
          pwHasUpper: false
        });
      }
      if (!pwHasLower) {
        this.setState({
          pwHasLower: false
        });
      }
      if (!pwHasNum) {
        this.setState({
          pwHasNum: false
        });
      }
      return;
    }
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
            badName: 'Username already exists, please make another'
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
      password: '',
      goodPwLength: null,
      badName: null
    });
  }

  render() {
    return (
      <>
        <div className='d-flex row justify-content-center m-5'>
          <Form className='w-50 p-5 bg-white' onSubmit={this.handleSubmit}>
            <h3 className='mb-4'>
              Create Account
            </h3>
            <Form.Group className="mb-3 text-start" controlId="newUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.username} type="text" name='username'/>
              {this.state.badName
                ? <p className='text-danger text-start'>
                    {this.state.badName}
                  </p>
                : <p className='text-muted'>
                    Username must be at least 6 characters long
                  </p>
              }
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="newPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.password} type="password" name='password'/>
                  <div className='text-muted' >
                    <p>
                      Password must:
                    </p>
                    <ul>
                      <li {...(this.state.goodPwLength === false && { className: 'text-danger' })}>Be at least 6 characters long</li>
                      <li {...(this.state.pwHasUpper === false && { className: 'text-danger' })}>Have one uppercase letter</li>
                      <li {...(this.state.pwHasLower === false && { className: 'text-danger' })}>Have one lowercase letter</li>
                      <li {...(this.state.pwHasNum === false && { className: 'text-danger' })}>Have one number</li>
                    </ul>
                  </div>
            </Form.Group>
            {this.state.didSignUp &&
              <p className='text-success text-start'>
                Account Created Successfully!
              </p>
            }
            <Button className='mt-3 w-100 border-0 blue-button' variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default SignUp;
