import React, { Component } from 'react';

export class AxeptioCheckbox extends Component {

	componentDidMount () {

		if (!this.refs.checkbox.getAttribute("initialized")) {

			window.axeptioSettings = window.axeptioSettings || {};
			window.axeptioSettings.onChange = this.onChange(window.axeptioSettings.onChange).bind(this);
			this.refs.checkbox.setAttribute("initialized", true);
		}
	}

	onChange (former) {

		return (name, checked, input) => {

			(former || new Function())(name, checked, input);
			if (name === this.props.name)
				(this.props.onChange || new Function())(checked, input);
		}
	}

	render () {

		return (
			<div ref="checkbox" id={"axeptio-checkbox-" + this.props.name.replace(/ /g,'')} className="axeptio-checkbox">
				<input type="checkbox" name={this.props.name} data-axeptio={this.props.data}/>
			</div>
		)
	}
}

export default class Axeptio extends Component {

	onChange = former => (name, checked, input) => {

		(former || new Function())(name, checked, input);
		(this.props.onChange || new Function())(name, checked, input);
	}

	componentDidMount() {

		if (!document.getElementById("axeptio-script")) {

			window.axeptioSettings = window.axeptioSettings || {};
	        window.axeptioSettings = {
	          clientId: this.props.clientId || null,
	          token: this.props.token || null,
	          onToken: this.props.onToken || new Function(),
	          onChange:this.onChange(window.axeptioSettings.onChange).bind(this),
	          initAtLoad: this.props.initAtLoad || true,
	          globalPrototypeName: this.props.globalPrototypeName || "Axeptio",
	          globalInstanceName: this.props.globalInstanceName || "Axeptio",
	          debug: this.props.debug || false,
	          axeptioApiUrl: this.props.axeptioApiUrl || "https://api.axept.io/v1",
	          axeptioPlatformUrl: this.props.axeptioPlatformUrl || "https://platform.axept.io"
	        };

	        const script = document.createElement("script");
	        script.setAttribute("id", "axeptio-script");

	        script.src = "https://platform.axept.io/embed.js";

			document.body.appendChild(script);
		}
    }

	render () {

		return (
			<div className="axeptio">
				{ this.props.children }
			</div>
		)
	}
}