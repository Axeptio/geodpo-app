import React, { Component } from 'react';
import { Map as LMap, TileLayer } from 'react-leaflet'
import Person from './Person'
//import dpo from '../../Data/dpo.json'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import '../../../node_modules/react-leaflet-markercluster/dist/styles.min.css';

class Map extends Component {

  constructor (props) {

  	super(props);
    this.state = this.props.position;
    this.state.profiles = this.props.profiles;
    this.initProfiles = this.initProfiles.bind(this);
    this.state.missions = [];
    this.initMissions = this.initMissions.bind(this);
    //this.initProfiles(dpo.dpo);
  }

  updateState () {
    this.props.onUpdateState(this.getState());
  }

  getState () {
    
    return {
      lat: this.refs.map.leafletElement.getCenter().lat,
      lng: this.refs.map.leafletElement.getCenter().lng,
      zoom: this.refs.map.leafletElement.getZoom()
    };
  }

  /*shouldComponentUpdate(nextProps, nextState){
    return false
  }*/

  displayCluster (cluster) {

    var profiles = [];

    function clusterAddProfiles (cl) {

      cl._markers.forEach(m => profiles.push(m.options.profile));
      cl._childClusters.forEach(c => { clusterAddProfiles(c); })
    }

    clusterAddProfiles(cluster);

    this.props.onClusterClick(profiles);
  }

  handleProfileClick(profile){

    this.props.onProfileClick(profile);
  }

  focusSearch (industry, latlng) {

    function haversineDistance(coords1, coords2) {

      function toRad(x) { return x * Math.PI / 180; }

      var lon1 = coords1.lng;
      var lat1 = coords1.lat;

      var lon2 = coords2.lng;
      var lat2 = coords2.lat;

      var R = 6371; // km

      var x1 = lat2 - lat1;
      var dLat = toRad(x1);
      var x2 = lon2 - lon1;
      var dLon = toRad(x2)
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      return d;
    }

    var search = [], search2 = [];
    let acceptRange = 40;
    if (industry !== undefined) {
      this.state.profiles.forEach(p => {
        if (p.tags.map(tag => tag.toLowerCase()).includes(industry.toLowerCase()))
          search.push(p);
      })
    } else search = this.state.profiles.slice();
    if (latlng !== undefined) {
      let itf = p => {
          if (haversineDistance(latlng, p.location.latlng) < acceptRange)
            search2.push(p);
        };
      do {
        search2 = [];
        search.forEach(itf);
        acceptRange += 20;
      } while (acceptRange < 200 && search2.length < 6);
    } else search2 = search.slice();

    this.props.onClusterClick(search2);
  }

  initProfiles(profiles) {

    //this.state.profiles.forEach(p => profiles.push(p));
    this.setState({ profiles: profiles });
    this.forceUpdate();
  }

  initMissions(missions) {

    this.setState({ missions: missions });
    this.forceUpdate();
  }

  render() {
    return (
      <LMap ref="map" onClick={this.props.onClick} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onMoveend={this.updateState.bind(this)} onZoomend={this.updateState.bind(this)} zoomControl={false}>
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <MarkerClusterGroup onClusterClick={this.displayCluster.bind(this)}>
          { this.state.profiles.map((e, i) => <Person id={"char-" + i} 
            key={i} profile={e} position={e.location.latlng} 
            onClick={profile => this.handleProfileClick(profile)}/>) }
        </MarkerClusterGroup>
      </LMap>
    )
  }
}

export default Map;
