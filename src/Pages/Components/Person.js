import React, { Component } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet'
class Person extends Component {

	pinIcon = L.icon({
	    iconUrl: 'pin.png',
	    iconSize: [32, 32],
	    iconAnchor: [16, 32]
	});

	display() {
		
		this.props.onClick(this.props.profile);
	}

	render() {

		return (
				
       		<Marker profile={this.props.profile} position={this.props.position} onClick={e => this.display()} icon={L.icon({
				    iconUrl: this.props.profile.avatar,
				    iconSize: [24, 24],
				    iconAnchor: [12, 12],
				    className: "marker-avatar"
				})}/>
       	)
	}
}

export default Person