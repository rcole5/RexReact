import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Thumbnail } from 'react-bootstrap';

class Movie extends React.Component {
	render() {
		return(
			<Col xs={12} md={4}>
        <Link to={"/movies/" + this.props.id}>
          <Thumbnail src={this.props.image}>
            <h3>{this.props.name}</h3>
            Rating: <b>{this.props.rating}</b>
            <p>{this.props.description}</p>
          </Thumbnail>          
        </Link>
			</Col>
		);
	}
}

export default Movie;