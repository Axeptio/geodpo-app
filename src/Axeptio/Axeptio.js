import React, { Component } from "react";

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
      if (name === this.props.name)
        (this.props.onChange || new Function())(checked, input);
    };
  }

  render() {
    return (
      <div className="axeptio-checkbox">
        <input
          type="checkbox"
          name={this.props.name}
          data-axeptio={this.props.data}
        />
      </div>
    );
  }
}

export default class Axeptio extends Component {
  constructor(props) {
    super(props);

    this.initialized = false;
  }

  onChange(former) {
    return (name, checked, input) => {
      (former || new Function())(name, checked, input);
      (this.props.onChange || new Function())(name, checked, input);
    };
  }

  componentDidMount() {
    if (this.initialized || document.getElementById("axeptio-script")) {

      window.axeptio.clear();
      window.axeptio.init();
      return;
    }

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

    const script = document.createElement("script");
    script.setAttribute("id", "axeptio-script");

    script.src = "https://platform.axept.io/embed.js";
    this.initialized = true;

    document.body.appendChild(script);
  }

  render() {
    return <div className="axeptio">{this.props.children}</div>;
  }
}