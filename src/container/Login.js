import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col, Checkbox, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';
import NavBar from '../Components/NavBar';
// import { LoginAction } from '../LoginAction';
import setAuthToken from '../actions/authActions';
import { settings } from '../settings';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    var self = this;
    event.preventDefault();
    var apiUrl = settings.serverUrl + '/api/';
    var payload = {
      "email": this.state.email,
      "password": this.state.password,
    };

    axios.post(apiUrl+'login', payload).then(function(response) {
      if (response.status === 200) {
        console.log(response.data.data.api_token)
        const token = response.data.data.api_token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        self.setState({redirect: true});
      }
    });
  }

	render() {
    if (this.state.redirect) {return <Redirect to="/" />;}
		return (
      <div>
      <NavBar path={this.props.location.pathname} />
      <div className="container">
        <h1>Login</h1>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" onChange = {
                (event) => this.setState({email: event.target.value})} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" onChange={
                (event) => this.setState({password: event.target.value})} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>
      
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={ this.handleLogin }>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
      </div>
		);
	}
}

export default Login;