import React from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Form, FormControl, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios'
import NavBar from '../Components/NavBar';
import Actor from '../Components/Actor';
import { settings } from '../settings';
import { getAge } from '../utils/utils';

class Actors extends React.Component{
	constructor(props) {
		super(props);

    this.state = {
      loggedIn: false,
      actors: [],
      sortYoung: true,
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

  sortByDate(oldest = true, data) {
    if (!oldest) {
      return data.sort((a, b) => {
        return new Date(a.dob).getTime() - new Date(b.dob).getTime();
      });
    } else {
      return data.sort((a, b) => {
        return new Date(a.dob).getTime() - new Date(b.dob).getTime();
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
      return;
    });
    self.setState({actors: searchArray});
  }

  sortByDateAcc(e) {
    const self = this;
    const sortedActors = self.sortByDate(true, self.state.allactors);
    self.setState({allactors: sortedActors, 
      actors: sortedActors});
  }

  sortByDateDec(e) {
    const self = this;
    const sortedActors = self.sortByDate(false, self.state.allactors);
    self.setState({allactors: sortedActors, 
      actors: sortedActors});
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
          <div style={{ height: 69, padding: 20 }}>
          <DropdownButton title="Sort By" id="btn-select-sort">
            <MenuItem eventKey="1" value={true} onClick={ (e) => this.sortByDateAcc(e) }>Youngest</MenuItem>
            <MenuItem eventKey="2" onClick={ (e) => this.sortByDateDec(e) }>Oldest</MenuItem>
          </DropdownButton>
          </div>
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
                age={ getAge(actor.dob) }
                bio={actor.bio} />
            })}
        </div>
      </div>
		);
	}
}

export default Actors;