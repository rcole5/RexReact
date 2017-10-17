import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import NavBar from '../Components/NavBar';
import { settings } from '../settings';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirect: false,
    }

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    var self = this;
    var apiUrl = settings.serverUrl + '/api/';
    var payload = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password,
      "password_confirmation": this.state.confirmPassword
    }

    axios.post(apiUrl+'register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.confirmPassword
    }).then(function(response) {
      console.log(response);
      if (response.status === 201) {
        self.setState({redirect: true});
      }
    });
  }

	render() {

    if (this.state.redirect) {return <Redirect to="/login"/>;}
		return (
      <div>
      <NavBar path={this.props.location.pathname} />
      <div className="container">
        <h1 className="col-sm-offset-2">Register</h1>
        <form className="form-horizontal" onSubmit={ this.handleRegister }>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Name" onChange={
                (event) => this.setState({name: event.target.value})
              } />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" onChange={
                (event) => this.setState({email: event.target.value})
              }/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" onChange={
                (event) => this.setState({password: event.target.value})
              }/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalConfirmPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Confirm-Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" onChange={
                (event) => this.setState({confirmPassword: event.target.value})
              }/>
            </Col>
          </FormGroup>
      
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.handleRegister}>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </form>
      </div>
      </div>
		);
	}
}

export default SignUp;