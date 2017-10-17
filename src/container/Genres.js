import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios'
import NavBar from '../Components/NavBar';
import { checkToken } from '../utils/utils';
import { settings } from '../settings';

class Genres extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
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
    if (this.state.loggedIn) {
      // Make request
      axios.get(settings.serverUrl + '/api/genre', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
      }).then(function(response){
        if (response.status === 200) {
          self.setState({genres: response.data.data});
        }
      });
    }
  }


	render() {
    if (!this.state.loggedIn) {return <Redirect to="/login" />};

    return (
      <div>
        <NavBar path={this.props.location.pathanme} />

        <div className="container">
          <h1>Genres</h1>
          <div>
            <ul>
            {this.state.genres.map(function(genre){
              return <li key={genre.id}><a href={"genres/" + genre.id}>{genre.name}</a></li>
            })}
            </ul>
          </div>
        </div>
      </div>
    );
	}
}

export default Genres;