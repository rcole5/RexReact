import React from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Form, FormControl, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios'
import NavBar from '../Components/NavBar';
import Actor from '../Components/Actor';
import { settings } from '../settings';

class Actors extends React.Component{
	constructor(props) {
		super(props);

    this.state = {
      loggedIn: false,
      actors: [],
      sortNew: true,
    }

    this.handleFilter = this.handleFilter.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByDateAcc = this.sortByDateAcc.bind(this);
    this.sortByDateDec = this.sortByDateDec.bind(this);
	}

	componentWillMount() {
    // Check if user is logged in.
		if (localStorage.getItem('jwtToken') !== null) {
      this.setState({loggedIn: true});
    } else {
      this.setState({loggedIn: false});
    }
	}

	componentDidMount() {
    const self = this;
    // Check if user is logged in.
		if (this.state.loggedIn) {
      axios.get(settings.serverUrl + '/api/actor', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}}
      ).then(function(response){
        self.setState({allactors: response.data.data, 
          actors: response.data.data});
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
    this.state.allactors.map(function(actor) {
      if (actor.name.includes(e.target.value)) {
        searchArray.push(actor);
      }
    });
    self.setState({actors: searchArray});
  }

  sortByDateAcc(e) {
    const self = this;
    // const sortedActors = self.sortByDate(true, self.state.allactors);
    // self.setState({allactors: sortedActors, 
      // movies: sortedActors});
  }

  sortByDateDec(e) {
    const self = this;
    // const sortedActors = self.sortByDate(false, self.state.allactors);
    // self.setState({allactors: sortedActors, 
      // movies: sortedActors});
  }

	render() {
    // Redirect if user is not logged in.
		if (!this.state.loggedIn) {return <Redirect to="/login"/>};
		return (
      <div>
        <NavBar path={this.props.location.pathname}/>
		    <div className="container">
        <Row>
        <Col sm={4}>
          <h1>Actors</h1>
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
            {this.state.actors.map(function(actor) {
              return <Actor key={actor.id}
                id={actor.id}
                image={actor.image}
                name={actor.name}
                bio={actor.bio} />
            })}
        </div>
      </div>
		);
	}
}

export default Actors;