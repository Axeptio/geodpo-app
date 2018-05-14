import React, { Component } from 'react';
import Profile from './ShortProfile'

class Profiles extends Component {

	render() {

		return (
			<div className="short-profiles-container">
			{
				this.props.empty ?
					<div className="empty-list-indicator">Aucun résultat</div> :
					this.props.data.map((p, i) => <Profile onProfileClick={this.props.onProfileClick} key={i} profile={p} onSearch={this.props.onSearch}/>)
			}
      		</div>
		)
	}
}

export default Profiles