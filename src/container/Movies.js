import React from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Form, FormControl, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios'
import NavBar from '../Components/NavBar';
import Movie from '../Components/Movie';
import {checkToken} from '../utils/authUtils';
import { settings } from '../settings';

class Movies extends React.Component{
	constructor(props) {
		super(props);

    this.state = {
      loggedIn: false,
      movies: [],
      sortNew: true,
    }

    this.handleFilter = this.handleFilter.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByDateAcc = this.sortByDateAcc.bind(this);
    this.sortByDateDec = this.sortByDateDec.bind(this);
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
      axios.get(settings.serverUrl + '/api/movie', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}}
      ).then(function(response){
        const sortedMovies = self.sortByDate(self.state.sortNew, response.data.data);
        self.setState({allmovies: sortedMovies, 
          movies: sortedMovies});
      });
    }

	}

  sortByDate(newest = true, data) {
    if (newest) {
      return data.sort((a, b) => {
        return new Date(a.created_at.date).getTime() - new Date(b.created_at.date).getTime();
      });
    } else {
      return data.sort((a, b) => {
        return new Date(a.created_at.date).getTime() - new Date(b.created_at.date).getTime();
      }).reverse();
    }
  }

  handleFilter(e) {
    const self = this;
    const searchArray = [];
    this.state.allmovies.map(function(movie) {
      if (movie.title.includes(e.target.value)) {
        searchArray.push(movie);
      }
      return;
    });
    self.setState({movies: searchArray});
  }

  sortByDateAcc(e) {
    const self = this;
    const sortedMovies = self.sortByDate(true, self.state.allmovies);
    self.setState({allmovies: sortedMovies, 
      movies: sortedMovies});
  }

  sortByDateDec(e) {
    const self = this;
    const sortedMovies = self.sortByDate(false, self.state.allmovies);
    self.setState({allmovies: sortedMovies, 
      movies: sortedMovies});
  }

	render() {
		if (!this.state.loggedIn) {return <Redirect to="/login"/>};
		return (
      <div>
        <NavBar path={this.props.location.pathname}/>
		    <div className="container">
        <Row>
        <Col sm={4}>
          <h1>Movies</h1>
        </Col>
        <Col sm={4}>
          <DropdownButton title="Sort By" id="btn-select-sort">
            <MenuItem eventKey="1" value={true} onClick={ (e) => this.sortByDateAcc(e) }>Newest</MenuItem>
            <MenuItem eventKey="2" onClick={ (e) => this.sortByDateDec(e) }>Oldest</MenuItem>
          </DropdownButton>
        </Col>
        <Col sm={4}>
        <Form>
          <FormGroup controlId="formFilterMovie">
            Filter:
            <FormControl type="text" onChange= {
              (e) => this.handleFilter(e)
            }/>
          </FormGroup>
        </Form>
        </Col>
        </Row>
            {this.state.movies.map(function(movie) {
              return <Movie key={movie.id} id={movie.id} image={movie.image} name={movie.title} rating={movie.rating} description={movie.description}/>;
            })}
        </div>
      </div>
		);
	}
}

export default Movies;