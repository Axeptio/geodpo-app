import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Map from './Components/Map'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import ProfileMenu from './Components/ProfileMenu'
import ProfileMaker from './Components/ProfileMaker'
//import SigninMenu from './Components/SigninMenu'
//import dpo from '../Data/dpo.json'
import Profiles from './Components/Profiles';
import Place from 'react-algolia-places';

class MapPage extends Component {

	hidden = true;
  profile = <ProfileMaker/>;

	constructor (props) {

		super(props)
    this.validateSearch = this.validateSearch.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.hideProfile = this.hideProfile.bind(this);

    var p = (<div/>);
    switch (props.mode) {

      case "profile":
        this.props.profiles.forEach(d => { if (d.id === props.profile) p = (<Profile onEditProfile={this.handleEditProfile} api={this.props.options.api} profile={d} onSearch={tag => this.handleSearch(tag)}/>) })
        this.prefix = "/profile/" + props.profile;
        break;

      case "edit":
        this.props.profiles.forEach(d => { if (d.id === props.profile) p = (<EditProfile onCreateProfile={this.hideProfile} api={this.props.options.api} profile={d}/>) })
        this.prefix = "/edit/" + props.profile;
        break;

      case "list":
        const profileIds = props.list;
        if (profileIds === "empty") {
          p = (<Profiles api={this.props.options.api} empty/>)
        } else {
          var profiles = this.props.profiles.filter(d => profileIds.includes(d.id))
          p = (<Profiles onProfileClick={this.handleProfileClick} api={this.props.options.api} data={profiles} onSearch={tag => this.handleSearch(tag)}/>)
          this.prefix = "/list/" + profileIds;
        }
        break;

      case "search":
        this.prefix = "/search/" + props.tag;
        break;

      case "seek":
        this.prefix = "/seek";
        break;

      case "signup":
        p = (<ProfileMaker onCreateProfile={this.hideProfile} api={this.props.options.api}/>);
        this.prefix = "/signup";
        break;

      /*case "signin":
        p = (<SigninMenu api={this.props.options.api}/>);
        this.prefix = "/signin";
        break;*/

      default: this.prefix = "";
    }

    this.state = {
      hidden: props.mode === "vanilla",
      profile: p,
      lightbox: (<div/>)
    }
	}

  componentDidMount() {

    if (this.props.mode === "search" || this.props.mode === "seek") {

      var search = this.props.mode === "search" ?
         this.props.profiles.filter(p =>
            p.tags.map(tag => tag.toLowerCase()).includes(this.props.tag.toLowerCase()) ||
            p.resume.toLowerCase().includes(this.props.tag.toLowerCase())
          ) :
          this.props.profiles.slice();
        
      let bounds = this.refs.map.refs.map.leafletElement.getBounds();
      search = search.filter(p => p.location.latlng.lat < bounds._northEast.lat && p.location.latlng.lat > bounds._southWest.lat
        && p.location.latlng.lng < bounds._northEast.lng && p.location.latlng.lng > bounds._southWest.lng)

      if (search.length > 0)
        this.setState({profile : <Profiles onProfileClick={this.handleProfileClick} api={this.props.options.api} data={search} onSearch={tag => this.handleSearch(tag)}/>})
      else
        this.setState({profile : <Profiles  api={this.props.options.api} empty/>})
    }
  }

  componentWillReceiveProps(props) {

    var p = (<div/>);
    switch (props.mode) {

      case "profile":
        this.props.profiles.forEach(d => { if (d.id === props.profile) p = (<Profile onEditProfile={this.handleEditProfile} api={this.props.options.api} profile={d} onSearch={tag => this.handleSearch(tag)}/>) })
        this.prefix = "/profile/" + props.profile;
        break;

      case "edit":
        this.props.profiles.forEach(d => { if (d.id === props.profile) p = (<EditProfile onCreateProfile={this.hideProfile} api={this.props.options.api} profile={d}/>) })
        this.prefix = "/edit/" + props.profile;
        break;

      case "list":
        const profileIds = props.list;
        if (profileIds === "empty") {
          p = (<Profiles api={this.props.options.api} empty/>)
        } else {
          var profiles = [];
          this.props.profiles.forEach(d => { if (profileIds.includes(d.id)) profiles.push(d); })
          p = (<Profiles onProfileClick={this.handleProfileClick} api={this.props.options.api} data={profiles} onSearch={tag => this.handleSearch(tag)}/>)
          this.prefix = "/list/" + profileIds;
        }
        break;

      case "search":
        {
        var search = this.props.profiles.filter(p =>
          p.tags.map(tag => tag.toLowerCase()).includes(this.props.tag.toLowerCase()) ||
          p.resume.toLowerCase().includes(props.tag.toLowerCase())
        );
        
        let bounds = this.refs.map.refs.map.leafletElement.getBounds();
        search = search.filter(p => p.location.latlng.lat < bounds._northEast.lat && p.location.latlng.lat > bounds._southWest.lat
          && p.location.latlng.lng < bounds._northEast.lng && p.location.latlng.lng > bounds._southWest.lng)
        if (search.length > 0)
          p = <Profiles onProfileClick={this.handleProfileClick} api={this.props.options.api} data={search} onSearch={tag => this.handleSearch(tag)}/>
        else
          p = <Profiles  api={this.props.options.api} empty/>
        this.prefix = "/search/" + props.tag;
        }
        break;

      case "seek":
        {
        let bounds = this.refs.map.refs.map.leafletElement.getBounds();
        let seek = this.props.profiles.filter(p => p.location.latlng.lat < bounds._northEast.lat && p.location.latlng.lat > bounds._southWest.lat
          && p.location.latlng.lng < bounds._northEast.lng && p.location.latlng.lng > bounds._southWest.lng)
        if (seek.length > 0)
          p = <Profiles onProfileClick={this.handleProfileClick} api={this.props.options.api} data={search} onSearch={tag => this.handleSearch(tag)}/>
        else
          p = <Profiles  api={this.props.options.api} empty/>
        this.prefix = "/seek";
        }
        break;

      case "signup":
        p = (<ProfileMaker onCreateProfile={this.hideProfile} api={this.props.options.api}/>);
        this.prefix = "/signup";
        break;

      /*case "signin":
        p = (<SigninMenu api={this.props.options.api}/>);
        this.prefix = "/signin";
        break;*/

      default: this.prefix = "";
    }

    this.setState({
      hidden: props.mode === "vanilla",
      profile: p,
      lightbox: (<div/>)
    });
  }

	hideProfile() {

    const state = this.refs.map.getState();

    this.props.history.push(`/${state.lat}/${state.lng}/${state.zoom}`)
	}

  handleProfileClick(profile) {

    const state = this.refs.map.getState();

    this.props.history.push(`/profile/${profile.id}/${state.lat}/${state.lng}/${state.zoom}`);
  }

  handleEditProfile(profile) {

    const state = this.refs.map.getState();

    this.props.history.push(`/edit/${profile.id}/${state.lat}/${state.lng}/${state.zoom}`);
  }

  handleClusterClick(profiles) {

    const state = this.refs.map.getState();

    var ids = [];
    profiles.forEach(p => ids.push(p.id));

    this.props.history.push(`/list/${ids.length === 0 ? "empty" : ids}/${state.lat}/${state.lng}/${state.zoom}`)
  }

  handleUpdateMap (state) {

    this.props.history.push(`${this.prefix}/${state.lat}/${state.lng}/${state.zoom}`)
  }

  handleCreateProfile () {

    const state = this.refs.map.getState();

    this.props.history.push(`/signup/${state.lat}/${state.lng}/${state.zoom}`)
  }

  handleSearch(tag) {

    const state = this.refs.map.getState();

    this.props.history.push((tag === "" ? `/seek/` : `/search/${tag}/`) + `${state.lat}/${state.lng}/${state.zoom}`)
  }

  validateSearch () {

    this.handleSearch(document.getElementById("industry-search-form").value);
  }

  /*selectCity (data) {

    this.searchLocation = data.suggestion.latlng;
  }

  removeCity () {

    this.searchLocation = undefined;
  }*/

  toggleExtendedNavbar() {

    document.getElementsByClassName("navbar")[0].classList.toggle("extended-navbar");
  }

  render() {
    return (
      <div id="map-page">
        {this.lightbox}
      	<Navbar>
      		<NavbarBrand><img id="img-logo" src="/logo.png" alt="logo"/></NavbarBrand>
          <span className="handheld-extender" onClick={() => this.toggleExtendedNavbar()}>X
            <svg className="expand-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 306 306">
            <g><g id="expand-more"><polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35            "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
          </span>
      		<form id="map-search-form" action="javascript:()=>{};" onSubmit={this.validateSearch}>
      			<input id="industry-search-form" className="header-input" type="text" placeholder="Mots-clefs" name="tag"/>
      			<input className="header-input" type="submit" name="confirm" value="Ok"/>
      		</form>
      		<div id="header-links">
            <div className="add-button" onClick={() => this.handleCreateProfile()}>
              <div className="add-button-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
              <g><g><path d="M194.994,52.5c-88.083,0-159.5,71.411-159.5,159.5
                    c0,88.09,159.5,265.833,159.5,265.833S354.5,300.091,354.5,212C354.5,123.91,283.083,52.5,194.994,52.5z M194.994,278.455
                    c-44.042,0-79.75-35.705-79.75-79.747c0-44.048,35.708-79.75,79.75-79.75c44.047,0,79.75,35.702,79.75,79.75
                    C274.744,242.75,239.041,278.455,194.994,278.455z"/>
                </g></g>
              <path fill="#010101" d="M373.21,335.106c0.54-12.7,12.02-23.69,24.75-23.65c10.3-0.52,20.399,5.91,24.34,15.44
                c2.45,5.43,2.04,11.5,2.06,17.31c-0.12,8.25,0.08,16.5-0.05,24.75c10.9,0.08,21.81-0.01,32.71,0.05c7.49,0.2,14.88,3.74,19.44,9.74
                c6.189,7.62,7.109,18.86,2.729,27.57c-3.96,7.88-12.24,13.439-21.09,13.84c-11.2,0.23-22.41-0.05-33.61,0.1
                c-0.359,8.641-0.06,17.29-0.14,25.94c-0.08,4.2,0.26,8.48-0.84,12.59c-2.07,8.32-8.69,15.37-16.9,17.86
                c-7.75,2.399-16.71,1.18-23.189-3.82c-6.46-4.7-10.381-12.59-10.271-20.56c-0.07-10.681,0.061-21.37-0.05-32.05
                c-8.7,0.13-17.4-0.141-26.1,0.06c-4.131-0.07-8.341,0.2-12.381-0.84c-8.55-2.15-15.76-9.09-18.1-17.62
                c-1.62-5.83-1.31-12.24,1.25-17.771c3.76-8.689,12.74-14.71,22.2-15.01c11.01-0.1,22.03-0.03,33.05-0.04
                C373.35,357.706,372.949,346.406,373.21,335.106z"/>
              </svg>
              </div>
              <span className="add-button-text">Je veux être référencé</span>
            </div>
      		</div>
      	</Navbar>
      	<div id="map-holder">
          <ProfileMenu onClose={this.hideProfile} hidden={this.state.hidden}>
            {this.state.profile}
          </ProfileMenu>
        	<Map ref="map"
            profiles={this.props.profiles}
            position={this.props.position}
            onClick={this.hideProfile.bind(this)}
            onUpdateState={state => this.handleUpdateMap(state)}
            onProfileClick={profile => this.handleProfileClick(profile)}
            onClusterClick={profiles => this.handleClusterClick(profiles)}
          />
        </div>
      </div>

    );
  }
}

export default MapPage;
