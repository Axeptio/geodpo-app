import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Map from './Components/Map'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import ProfileMenu from './Components/ProfileMenu'
import ProfileMaker from './Components/ProfileMaker'
import SigninMenu from './Components/SigninMenu'
//import dpo from '../Data/dpo.json'
import Profiles from './Components/Profiles';
import HelpLightbox from './Components/HelpLightbox';

class MapPage extends Component {

	hidden = true;
  profile = <ProfileMaker/>;

	constructor (props) {

		super(props);
    this.validateSearch = this.validateSearch.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.hideProfile = this.hideProfile.bind(this);
    this.editEmail = this.editEmail.bind(this);

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

      case "signin":
        p = (<SigninMenu edit={this.editEmail} api={this.props.options.api}/>);
        this.prefix = "/signin";
        break;

      default: this.prefix = "";
    }

    this.state = {
      hidden: props.mode === "vanilla",
      profile: p,
      lightbox: this.getCookie("lightbox") === undefined || this.getCookie("lightbox") === "yes"
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
        let search = this.props.profiles.filter(p => p.location.latlng.lat < bounds._northEast.lat && p.location.latlng.lat > bounds._southWest.lat
          && p.location.latlng.lng < bounds._northEast.lng && p.location.latlng.lng > bounds._southWest.lng)
        if (search.length > 0)
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

      case "signin":
        p = (<SigninMenu edit={this.editEmail} api={this.props.options.api}/>);
        this.prefix = "/signin";
        break;

      default: this.prefix = "";
    }

    this.setState({
      hidden: props.mode === "vanilla",
      profile: p,
      lightbox: this.getCookie("lightbox") === undefined
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

  editEmail (email) {

    this.props.profiles.forEach(p => {

      if (p.email === email) {
        this.handleEditProfile(p);
        return;
      }
    })
  }

  setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
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

  handleSignin () {

    const state = this.refs.map.getState();

    this.props.history.push(`/signin/${state.lat}/${state.lng}/${state.zoom}`)
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

  showLightbox () {

    this.setCookie("lightbox", "yes", -1);
    this.setState({lightbox: true});
  }

  handleCloseLightbox () {

    this.setCookie("lightbox", "no", 365);
    this.setState({lightbox: false});
  }

  render() {
    return (
      <div id="map-page">
        { this.state.lightbox ? <HelpLightbox onCreateProfile={() => {this.handleCloseLightbox(); this.handleCreateProfile();}} onClose={() => this.handleCloseLightbox()}/> : <div/> }
      	<Navbar>
      		<NavbarBrand><img id="img-logo" src="/logo.png" alt="logo"/></NavbarBrand>
          <span className="handheld-extender" onClick={() => this.toggleExtendedNavbar()}>X
            <svg className="expand-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 306 306">
            <g><g id="expand-more"><polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35            "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
          </span>
      		<form id="map-search-form" onSubmit={e => {e.preventDefault(); this.validateSearch();} }>
      			<input id="industry-search-form" className="header-input" type="text" placeholder="Mots-clefs" name="tag"/>
      			<input className="header-input" type="submit" name="confirm" value="Ok"/>
      		</form>
      		<div id="header-links">
            <div className="signin-button" onClick={() => this.handleSignin()}>
              <div className="signin-button-icon">
                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 300 300">
                <path d="M287.305,243.005c-0.136-1.772-0.928-3.476-2.227-4.747L172.835,126.015c4.416-10.403,6.747-21.669,6.747-33.312
                  c0-22.754-8.875-44.163-24.938-60.266C138.558,16.366,117.164,7.5,94.397,7.5c-22.778,0-44.135,8.869-60.247,24.95
                  C0.907,65.675,0.9,119.716,34.145,152.938c16.111,16.115,37.475,24.99,60.241,24.99c11.646,0,22.884-2.35,33.312-6.772
                  l36.874,36.902c1.534,1.515,3.557,2.319,5.74,2.248l20.095-0.705l-0.656,20.145c-0.062,2.125,0.705,4.193,2.245,5.706
                  c1.484,1.512,3.569,2.334,5.685,2.248l20.169-0.689l-0.724,20.123c-0.063,2.127,0.754,4.199,2.238,5.712
                  c1.534,1.512,3.321,2.325,5.74,2.251l20.119-0.684l-0.674,20.126c-0.118,2.232,0.822,4.379,2.418,5.903
                  c1.472,1.339,3.309,2.06,5.245,2.06c0.278,0,0.563-0.012,0.847-0.037l30.851-3.426c4.169-0.455,7.205-4.175,6.847-8.353
                  L287.305,243.005z M84.106,82.415c-9.476,9.466-24.796,9.466-34.252,0c-9.47-9.469-9.47-24.786,0-34.246
                  c9.456-9.46,24.771-9.469,34.252-0.003C93.563,57.625,93.557,72.952,84.106,82.415z M260.97,245.575
                  c-1.126,1.126-2.635,1.688-4.101,1.688s-2.976-0.563-4.101-1.688l-95.501-95.529c2.659-2.867,5.077-5.885,7.273-9.058l96.429,96.41
                  C263.221,239.65,263.221,243.324,260.97,245.575z"/>
                </svg>
              </div>
              <span className="signin-button-text">Modifier mon profil</span>
            </div>
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
          <div onClick={() => this.showLightbox()} id="help-icon">?</div>
        </div>
      </div>

    );
  }
}

export default MapPage;
