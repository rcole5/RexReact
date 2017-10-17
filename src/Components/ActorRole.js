import React from 'react';
import { Link } from 'react-router-dom';

class ActorRole extends React.Component {
	render() {
    const backStyle = {
      backgroundColor: '#dbdbdb',
      display: 'inline-block',
      borderRadius: 25,
      padding: 8,
      margin: 0,
    };

    const textStyle = {
      'color': '#000',
      margin: 0,
      padding: 0,
    }

		return(     
      <Link to={"/actors/" + this.props.id}>
		    <div style={backStyle} className="rounded">
          <p style={textStyle}><b>{this.props.actor}</b> as <b>{this.props.name}</b></p>
		    </div>
      </Link>
		);
	}
}

export default ActorRole;