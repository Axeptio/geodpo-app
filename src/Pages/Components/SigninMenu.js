/*import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge, Tooltip, Collapse } from 'reactstrap';
import codes from '../../Data/codes.json'

class SigninMenu extends Component {

      confirmEdition () {

            this.props.api.auth({
              username: document.getElementById("email-form").value,
              password: document.getElementById("password-form").value
            }, "signin", data => {

                  this.props.onEditProfile(this.props.profile);
            }, err => {

                  let box = document.getElementById("signedup-box");
                  box.innerHTML = "Access denied.";
                  box.classList.add("warning");
                  box.classList.remove("hidden-box");
            });
      }

	render() {

		return (
			<div>
      			<div className="signin-box">
      				<div className="content-box">
                                    <div className="tri-box"/>
      					<div className="tri-box">
      						<img className="avatar" src={} alt="avatar"/>
      					</div>
                                    <div className="tri-box"/>
      				</div>
                              <div id="edit-box" className="content-box ext-box info">
                                    <Form>
                                          <Input type="text" name="email" id="email-form" placeholder="Email"/>
                                          <Input type="password" name="password" id="password-form" placeholder="Mot de passe"/>
                                          <button type="button" className="contact-button" onClick={() => this.confirmEdition()}>Editer</button>
                                          <div id="signedup-box" className="ext-box hidden-box"></div>
                                    </Form>
                              </div>
                        </div>
      		</div>
		)
	}
}

export default SigninMenu*/