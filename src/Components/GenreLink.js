import React from 'react';
import { Link } from 'react-router-dom';

class GenreLink extends React.Component {
	render() {
		const backStyle = {
			backgroundColor: '#dbdbdb',
			display: 'inline-block',
			borderRadius: 10,
			padding: 5,
			margin: 4,
		}

		const textStyle = {
			color: '#000',
			margin: 0,
			padding: 0,
		}

		return(
			<Link to={"/genre/" + this.props.id}>
        <div style={backStyle}>
          <p style={textStyle}>{this.props.genre}</p>
        </div>
      </Link>
		);
	}
}

export default GenreLink;