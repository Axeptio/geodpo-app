import React, { Component } from 'react';

class ProfileMenu extends Component {

	closeMenu() {

		this.props.onClose();
	}

	render() {

		return (
			<div id="profile-menu" className={this.props.hidden ? "hidden" : ""}>
				<span onClick={this.closeMenu.bind(this)} className="close-menu">&times;</span>
                {this.props.children}
      		</div>
		)
	}
}

export default ProfileMenu