import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import MapPage from './Pages/MapPage'
import './App.css'

class App extends Component {

		state = {
			missions: [],
			profiles: []
		}

	  componentDidMount() {

	    this.props.options.api.loadProfiles(profiles => { this.setState({profiles: profiles}); this.forceUpdate(); });
	    this.props.options.api.loadMissions(missions => { this.setState({missions: missions}); this.forceUpdate(); });
	  }

	render() {

		function getPosition(match) {

			if (match.params.lat === undefined || match.params.lng === undefined || match.params.zoom === undefined)
				return { lat: 46.929702, lng: 2.760582, zoom: 6 }
			else return { lat: parseFloat(match.params.lat), lng: parseFloat(match.params.lng), zoom: parseInt(match.params.zoom, 10) }
		}

		function vanillaMap ({match, history}) {

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="vanilla"/>
			);
		}

		function signinMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="signin"/>
			);
		}

		function signupMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="signup"/>
			);
		}

		function listMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="list"
					list={match.params.ids === "empty" ? "empty" : match.params.ids.split(",")}/>
			);
		}

		function searchMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="search"
					tag={match.params.tag}/>
			);
		}

		function seekMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="seek"/>
			);
		}

		function profileMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="profile"
					profile={match.params.id}/>
			);
		}

		function editMap ({match, history}) { 

			return (
				<MapPage position={getPosition(match)}
					options={this.props.options}
					profiles={this.state.profiles}
					missions={this.state.missions}
					history={history}
					mode="edit"
					profile={match.params.id}/>
			);
		}

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/:lat?/:lng?/:zoom?" component={vanillaMap.bind(this)}/>
					<Route path="/signin/:lat?/:lng?/:zoom?" component={signinMap.bind(this)}/>
					<Route path="/signup/:lat?/:lng?/:zoom?" component={signupMap.bind(this)}/>
					<Route path="/list/:ids/:lat?/:lng?/:zoom?" component={listMap.bind(this)}/>
					<Route path="/search/:tag/:lat?/:lng?/:zoom?" component={searchMap.bind(this)}/>
					<Route path="/seek/:lat?/:lng?/:zoom?" component={seekMap.bind(this)}/>
					<Route path="/profile/:id/:lat?/:lng?/:zoom?" component={profileMap.bind(this)}/> 
					<Route path="/edit/:id/:lat?/:lng?/:zoom?" component={editMap.bind(this)}/> 
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App