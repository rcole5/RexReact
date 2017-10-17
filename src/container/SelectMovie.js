import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Col, Image } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import ActorRole from '../Components/ActorRole';
import GenreLink from '../Components/GenreLink';
import { checkToken } from '../utils/utils';
import { settings } from '../settings';

class SelectMovie extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn: false,
      title: '',
      description: '',
      rating: 0,
      image: '',
      actors: [],
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
    console.log(this.props);
    const self = this;
    if (self.state.loggedIn) {
      // Get movie info.
      axios.get(settings.serverUrl + '/api/movie/' + self.props.match.params.id, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        console.log(response);
        if (response.status === 200) {
          self.setState({
            title: response.data.data.title,
            description: response.data.data.description,
            rating: response.data.data.rating,
            image: response.data.data.image,
          });
        }
      });

      // Get Movie Actors.
      axios.get(settings.serverUrl + '/api/movie/' + self.props.match.params.id + "/actor", {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        if (response.status === 200) {
          self.setState({actors: response.data.data})
        }
      });

      // Get Movie Genres.
      axios.get(settings.serverUrl + '/api/movie/' + self.props.match.params.id + "/genre", {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        console.log(response);
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
            <h1>{this.state.title}</h1>
            <div>
              {this.state.genres.map(function(genre) {
                return <GenreLink key={genre.id} id={genre.id} genre={genre.genre} />
              })}
            </div>
            <br />
            <b>Rating: {this.state.rating}</b>
            <p>Description: {this.state.description}</p>
            <b>Actors:</b>
            <br />
            { this.state.actors.map(function(actor) {
              return <ActorRole 
                key={actor.id} id={actor.id} actor={actor.actor_name} name={actor.character_name} />
            })}
          </Col>
        </div>
      </div>
    );
  }
}

export default SelectMovie;