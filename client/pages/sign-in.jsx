import React from 'react';
import { Form, Button, OverlayTrigger, Popover } from 'react-bootstrap';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      badName: null,
      goodPwLength: null,
      pwHasNum: null,
      pwHasUpper: null,
      pwHasLower: null,
      didSignUp: null,
      action: 'Sign-In'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pwTooltip = this.pwTooltip.bind(this);
    this.usernameTooltip = this.usernameTooltip.bind(this);
    this.changeForm = this.changeForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === 'username') {
      if (event.target.value.length >= 6) {
        this.setState({
          badName: false
        });
      } else {
        this.setState({
          badName: 'At least 6 characters long'
        });
      }
    }

    if (event.target.name === 'password') {
      if (!this.state.goodPwLength) {
        if (event.target.value.length >= 6) {
          this.setState({
            goodPwLength: true
          });
        } else {
          this.setState({
            goodPwLength: false
          });
        }
      }
      this.checkPwRequirements(event.target.value, /[A-Z]/g, 'pwHasUpper');
      this.checkPwRequirements(event.target.value, /[a-z]/g, 'pwHasLower');
      this.checkPwRequirements(event.target.value, /[0-9]/g, 'pwHasNum');
    }
  }

  checkPwRequirements(pw, regex, state) {
    if (pw.match(regex)) {
      this.setState({
        [state]: true
      });
    } else {
      this.setState({
        [state]: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password, pwHasUpper, pwHasLower, pwHasNum } = this.state;
    if (username.length < 6 || password.length < 6 || !pwHasUpper || !pwHasLower || !pwHasNum) {
      this.setState({
        didSignUp: false
      });
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
            badName: 'Username already exists'
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

  pwTooltip(props) {
    return (
      <Popover {...props}>
        <Popover.Header>
          Password Requirements:
        </Popover.Header>
        <Popover.Body>
            <p {...(this.state.goodPwLength === false && { className: 'text-danger' })}>At least 6 characters long</p>
            <p {...(this.state.pwHasUpper === false && { className: 'text-danger' })}>One uppercase letter</p>
            <p {...(this.state.pwHasLower === false && { className: 'text-danger' })}>One lowercase letter</p>
            <p {...(this.state.pwHasNum === false && { className: 'text-danger' })}>One number</p>
        </Popover.Body>
      </Popover>
    );
  }

  usernameTooltip(props) {
    return (
      <Popover {...props}>
        <Popover.Header>
          Username Requirements
        </Popover.Header>
        <Popover.Body>
          <p {...(this.state.badName === 'At least 6 characters long'
            ? { className: 'text-danger' }
            : { className: 'text-muted' })}>
              At least 6 characters long
          </p>
        </Popover.Body>
      </Popover>
    );
  }

  changeForm(event) {
    event.preventDefault();
    const sign = {
      'Sign-In': 'Sign-Up',
      'Sign-Up': 'Sign-In'
    };
    this.setState({
      action: sign[this.state.action]
    });
  }

  reset() {
    this.setState({
      username: '',
      password: '',
      goodPwLength: null,
      badName: null,
      pwHasNum: null,
      pwHasUpper: null,
      pwHasLower: null
    });
  }

  render() {
    const { action } = this.state;
    return (
      <>
        <div className='d-flex row justify-content-center m-5'>
          <Form className='col-8 col-lg-6 p-5 bg-white' onSubmit={this.handleSubmit}>
            <h3 className='mb-4'>
              {action === 'Sign-In' ? 'Sign In' : 'Create Account'}
            </h3>
            <Form.Group className="mb-3 text-start" controlId="newUsername">
              <Form.Label className='d-flex flex-nowrap justify-content-between fw-bolder'>
                Username
                <p className='m-0 account-form'> {action === 'Sign-Up' ? 'Have an Account?' : 'Need an account?'}
                  <a onClick={event => this.changeForm(event)} className='fw-bolder account-form-button text-decoration-none'> {action === 'Sign-Up' ? 'Sign-In' : 'Sign-Up'}</a>
                </p>
              </Form.Label>
              <OverlayTrigger
                placement="right"
                trigger={action === 'Sign-Up' && 'focus'}
                overlay={this.usernameTooltip}
              >
                <Form.Control onChange={this.handleChange} value={this.state.username} type="text" name='username' />
              </OverlayTrigger>
              {this.state.badName === 'Username already exists' &&
                <p className='text-danger text-start'>
                  Username already exists. Please choose a different username.
                </p>
              }
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="newPassword">
              <Form.Label className='fw-bolder'>Password</Form.Label>
              <OverlayTrigger
                placement="right"
                trigger={action === 'Sign-Up' && 'focus'}
                overlay={this.pwTooltip}
              >
                <Form.Control onChange={this.handleChange} value={this.state.password} type="password" name='password' />
              </OverlayTrigger>
            </Form.Group>
            {this.state.didSignUp === true &&
              <p className='text-success text-start'>
                Account Created Successfully!
              </p>
             }
             {this.state.didSignUp === false &&
              <p className='text-danger text-start'>
                Error creating account. Please check password and username requirements
              </p>
            }
            <Button className='mt-3 w-100 border-0 blue-button' variant="primary" type="submit">
              {action}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default SignIn;
