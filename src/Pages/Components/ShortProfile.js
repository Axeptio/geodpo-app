import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ShortProfile extends Component {

	display() {

		this.props.onProfileClick(this.props.profile);
	}

	render() {

		return (
			<div className="short-profile">
				<img className="avatar" src={this.props.profile.avatar} alt="avatar"/>
				<h2 className="full-name">{this.props.profile.fullname}</h2>
			    <div className="tag-list">
      				{ this.props.profile.tags.map(tag => <span key={"tag-" + tag} className="tag">{tag}</span>) }
      			</div>
      			<div className="more-info">
      				<Button outline onClick={this.display.bind(this)}>Profil</Button>
      			</div>
			</div>
		);
	}
}

export default ShortProfile