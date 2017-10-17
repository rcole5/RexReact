import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Thumbnail} from 'react-bootstrap';

class Actor extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<Col xs={12} md={4}>
        <Link to={"/actors/" + this.props.id}>
          <Thumbnail src={this.props.image}>
            <h3>{this.props.name}</h3>
            <p>{this.props.bio}</p>
          </Thumbnail>
        </Link>
			</Col>
		);
	}
}

export default Actor;