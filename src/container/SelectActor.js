import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Col, Image } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import ActorRole from '../Components/ActorRole';
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
      image: null,
      genres: [],
    }
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
          self.setState({
            name: response.data.data.name,
            bio: response.data.data.bio,
            dob: response.data.data.dob,
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

  render() {
    if (!this.state.loggedIn) {return <Redirect to="/" />;}
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
            <b>dob: {this.state.dob}</b>
            <p>bio: {this.state.bio}</p>
          </Col>
        </div>
      </div>
    );
  }
}

export default SelectMovie;