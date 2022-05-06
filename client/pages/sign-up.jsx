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
    if (this.state.badPw) {
      if (event.target.value.length >= 6 && event.target.name === 'password') {
        this.setState({
          badPw: null
        });
      }
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    if (username.length < 6 || password.length < 6) {
      if (username.length < 6) {
        this.setState({
          badName: 'Username must be at least 6 characters long'
        });
      }
      if (password.length < 6) {
        this.setState({
          badPw: 'Password must be at least 6 characters long'
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
      badPw: null,
      badName: null
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
              <Form.Control onChange={this.handleChange} value={this.state.password} type="password" name='password' placeholder="Password" />
              {this.state.badPw
                ? <p className='text-danger text-start'>
                  {this.state.badPw}
                </p>
                : <p className='text-muted'>
                  Password must be at least 6 characters long
                </p>
              }
            </Form.Group>
            {this.state.didSignUp &&
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
