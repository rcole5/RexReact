import React from 'react';
import { withRouther, Redirect } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken') !== null) {
      console.log(this.state.isLoggedIn);
      this.setState({isLoggedIn: true})
    } else {
      this.setState({isLoggedIn: false})
    }
  }

	render() {
    const isLoggedIn = false;
    const currentStyle = {
      borderBottomWidth: 3, 
      borderBottomColor: '#777', 
      borderBottomStyle: 'solid' 
    };

    if (this.state.redirect) {
      return <Redirect to="/login"/>
    }

		return(
			<Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Movie Site
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
      {/* Home Link */}
        {this.props.path === '/' ? (
            <NavItem href="/" style={currentStyle}>Home</NavItem>
          ) : ( 
            <NavItem href="/">Home</NavItem>
          )
        }

      {/* Movie Link */}
        {this.props.path === '/movies' ? (
          <NavItem href="/movies" style={ currentStyle }>Movies</NavItem>
          ) : (
            <NavItem href="/movies">Movies</NavItem>
          )
        }
            
      {/* Actors Link */}
        {this.props.path === '/actors' ? (
          <NavItem href="/actors" style={ currentStyle }>Actors</NavItem>
          ) : (
            <NavItem href="/actors">Actors</NavItem>
          )
        }

      {/* Genres Link */}
        {this.props.path === '/genres' ? (
          <NavItem href="/genres" style={ currentStyle }>Genres</NavItem>
          ) : (
            <NavItem href="/genres">Genres</NavItem>
          )
        }
        </Nav>

      {/* Check if user is logged in */}
          {this.state.isLoggedIn ? (
            <Nav pullRight>
              <NavItem onClick={() => {
                localStorage.removeItem('jwtToken');
                this.setState({redirect: true});
              }}>Logout</NavItem>
            </Nav>
          ) : (
            <Nav pullRight>
              <NavItem href="/register">Register</NavItem>
              <NavItem href="/login">Login</NavItem>
            </Nav>
          )}
          
			</Navbar>
		);
	}
}

export default NavBar;