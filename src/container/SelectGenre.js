import React from 'react';
import axios from 'axios';
import {settings} from '../settings';
import NavBar from '../Components/NavBar';
import Movie from '../Components/Movie';
import { checkToken } from '../utils/utils';

class SelectGenre extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loggedIn: false,
      genre: {},
      movies: [],
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
    if (this.state.loggedIn) {
      // Send request
      axios.get(settings.serverUrl + '/api/genre/' + self.props.match.params.id + '/movies', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        if (response.status === 200) {
          self.setState({movies: response.data.data});
        }
      });
    }
	}

	render() {
		
		return(
			<div>
        <NavBar path={this.props.location.pathname} />

        <div className="container">
          <h1>{this.state.genre.name}</h1>
          <div>
            <h3>Movies</h3>
            {this.state.movies.map(function(movie){
              return <Movie key={movie.id} id={movie.id} image={movie.image} name={movie.title} rating={movie.rating} description={movie.description}/>;
            })}
          </div>
        </div>
			</div>
		);
	}
}

export default SelectGenre;