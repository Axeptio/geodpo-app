import React, { Component } from 'react';

class ProfileMenu extends Component {

	closeMenu() {

		this.props.onClose();
	}

	render() {

		return (
			<div id="profile-container" className={this.props.hidden ? "hidden" : ""}>
				<span onClick={this.closeMenu.bind(this)} className="close-menu">
					<svg className="expand-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 306 306">
                    <g><g id="expand-more"><polygon points="270.3,58.65 153,175.95 35.7,58.65 20,94.35 153,227.35 286,94.35            "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                    </svg>
				</span>
				<div id="profile-menu">
	                {this.props.children}
	      		</div>
      		</div>
		)
	}
}

export default ProfileMenu