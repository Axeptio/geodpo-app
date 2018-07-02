import React, { Component } from "react";
import Script from 'react-load-script';

export class AxeptioCheckbox extends Component {
  constructor(props) {
    super(props);

    this.initialized = false;
  }

  componentDidMount() {
    if (this.initialized) return;

    window.axeptioSettings = window.axeptioSettings || {};
    window.axeptioSettings.onChange = this.onChange(
      window.axeptioSettings.onChange
    ).bind(this);
    this.initialized = true;
  }

  onChange(former) {
    return (name, checked, input) => {
      (former || new Function())(name, checked, input);
      if (name === this.props.identifier)
        (this.props.onChange || new Function())(checked, input);
    };
  }

  render() {
    return (
      <div className="axeptio-checkbox">
        <input
          type="checkbox"
          name={this.props.identifier}
          data-axeptio={`{"lang":"${this.props.lang || "EN"}","id":"${this.props.identifier}","type":"${this.props.type || 'doc'}"}`}
        />
      </div>
    );
  }
}

export default class Axeptio extends Component {

  onChange(former) {
    return (name, checked, input) => {
      (former || new Function())(name, checked, input);
      (this.props.onChange || new Function())(name, checked, input);
    };
  }

  componentDidMount() {
    if (this.initialized) return;

    window.axeptioSettings = window.axeptioSettings || {};
    window.axeptioSettings = {
      clientId: this.props.clientId || null,
      token: this.props.token || null,
      onToken: this.props.onToken || new Function(),
      onChange: this.onChange(window.axeptioSettings.onChange).bind(this),
      initAtLoad: this.props.initAtLoad || true,
      globalPrototypeName: this.props.globalPrototypeName || "Axeptio",
      globalInstanceName: this.props.globalInstanceName || "Axeptio",
      debug: this.props.debug || false,
      axeptioApiUrl: this.props.axeptioApiUrl || "https://api.axept.io/v1",
      axeptioPlatformUrl:
        this.props.axeptioPlatformUrl || "https://platform.axept.io"
    };

    this.initialized = true;
  }

  render() {
    return (
      <div className="axeptio">
        <Script url="https://platform.axept.io/embed.js"/>
        {this.props.children}
      </div>
    );
  }
}