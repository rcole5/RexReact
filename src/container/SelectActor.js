import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Col, Image } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import GenreLink from '../Components/GenreLink';
import { checkToken } from '../utils/authUtils';
import { settings } from '../settings';

class SelectMovie extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn: false,
      name: '',
      bio: '',
      dob: '',
      age: 0,
      image: null,
      genres: [],
    }

    this.getAge = this.getAge.bind(this);
  }

  componentWillMount() {
    if (checkToken(localStorage.getItem('jwtToken'))) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
  }

  componentDidMount() {
    const self = this;
    if (self.state.loggedIn) {
      // Get movie info.
      axios.get(settings.serverUrl + '/api/actor/' + self.props.match.params.id, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        if (response.status === 200) {
          var dob = new Date(response.data.data.dob);
          var dobDay = dob.getDate();
          var dobMonth = dob.getMonth();
          var dobYear = dob.getFullYear();
          self.setState({
            name: response.data.data.name,
            bio: response.data.data.bio,
            dob: dobDay + "/" + dobMonth + "/" + dobYear,
            age: self.getAge(response.data.data.dob),
            image: response.data.data.image,
          });
        }
      });

      // Get Movie Genres.
      axios.get(settings.serverUrl + '/api/actor/' + self.props.match.params.id + "/genre", {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        if (response.status === 200) {
          self.setState({genres: response.data.data})
        }
      });
    }
  }

  getAge(dob) {
    var now = new Date();
    var diff = now - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  render() {
    if (!this.state.loggedIn) {return <Redirect to="/" />;}
    var actorInfoStyle = {
      borderWidth: 2,
      borderStyle: 'solid',
      padding: 8,
      backgroundColor: '#f9ffc1',
    }
    return (
      <div>
        <NavBar path={this.props.location.pathname} />
        <div className="container">
          <Col md={6} xs={12}>
            <Image src={this.state.image} responsive alt="movie Image"/>
          </Col>
          <Col md={6} xs={12}>
            <h1>{this.state.name  }</h1>
            <div>
              {this.state.genres.map(function(genre) {
                return <GenreLink key={genre.id} id={genre.id} genre={genre.genre} />
              })}
            </div>
            <br />
            <div style={actorInfoStyle}>
              <p><b>Birthday:</b> {this.state.dob}</p>
              <b><b>Age:</b> {this.state.age}</b>
            </div>
            <h3>Bio</h3>
            <p>{this.state.bio}</p>
          </Col>
        </div>
      </div>
    );
  }
}

export default SelectMovie;