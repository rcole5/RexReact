import React from 'react';
import {Redirect} from 'react-router';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import Footer from '../Components/footer.js';
import Movie from '../Components/Movie';
import Actor from '../Components/Actor';
import { settings } from '../settings';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      actors: [],
      movies: [],
    }
  }

  componentWillMount() {
    // Check if user is logged in.
    if (localStorage.getItem('jwtToken') !== null) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false});
    }
  }

  componentDidMount() {
    const self = this;
    // Check if user is logged in before sending requests.
    if (this.state.loggedIn) {
      // Get latest movies.
      axios.get(settings.serverUrl + '/api/movie/latest', {
        limit: 6,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')},
      }).then(function(response) {
        if (response.status === 200) {
          self.setState({movies: response.data.data})
        }
      });

      // Get latest actors.
      axios.get(settings.serverUrl + '/api/actor/latest', {
        limit: 6,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')},
      }).then(function(response) {
        if (response.status === 200) {
          self.setState({actors: response.data.data})
        }
      });
    }
  }

	render() {
    // Redirect if user isn't logged in.
    if (!this.state.loggedIn) {return <Redirect to="/login"/>}
		return (
      <div>
        <NavBar path={this.props.location.pathname} />
        <div className="container">
          <Row>
            <h1>Recent Movies</h1>
            {this.state.movies.map(function(movie){
              return <Movie key={movie.id}
                id={movie.id} image={movie.image} name={movie.title}
                rating={movie.rating.toFixed(2)} description={movie.description} />
            })}
          </Row>
          <Row>
            <h1>Recent Actors</h1>
            {this.state.actors.map(function(actor) {
              return <Actor key={actor.id}
                id={actor.id}
                image={actor.image}
                name={actor.name}
                bio={actor.bio} />
              })}
          </Row>
        </div>
        <Footer />
      </div>
    );
	}
}

export default Home;
