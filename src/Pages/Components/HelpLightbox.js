import React, { Component } from 'react';

class HelpLightbox extends Component {

	render () {

		return(
			<div className="lightbox-container">
				<div className="lightbox">
					<div className="lightbox-header">
						<div className="lightbox-title">Bienvenue sur la <strong>carte</strong> des <strong>DPO</strong> !</div>
					</div>
					<div className="lightbox-body">
						<h4>A quoi ça sert ?</h4>
						<ul>
							<li>Bla bla</li>
							<li>Bla bla</li>
						</ul>
						<h4>Comment l'utiliser</h4>
						<ul>
							<li>Bla bla</li>
							<li>Bla bla</li>
						</ul>
						<h2 className="lightbox-next">J'ai compris !</h2>
					</div>
					<div className="lightbox-footer"/>
				</div>
			</div>
		);
	}
}

export default HelpLightbox;