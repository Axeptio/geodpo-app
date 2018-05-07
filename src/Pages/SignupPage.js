import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SignupPage extends Component {

	render() {

		return (
			<div id="signup-page">
				<main>
				  <Link to="/"><img id="title-img" src="logo.png" alt="logo"/></Link>
				  <div className="text-header">
				  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				  </p>
				  </div>
				  <Form className="signup-form">
					  <div className="form-box">
				        <FormGroup>
				          <Label for="fname-form">First name</Label>
				          <Input type="text" name="fname" id="fname-form"/>
				        </FormGroup>
				        <FormGroup>
				          <Label for="lname-form">Last name</Label>
				          <Input type="text" name="lname" id="lname-form"/>
				        </FormGroup>
				        <FormGroup>
				          <Label for="email-form">Email</Label>
				          <Input type="email" name="email" id="email-form"/>
				        </FormGroup>
				        <FormGroup>
				          <Label for="pass-form">Password</Label>
				          <Input type="password" name="password" id="pass-form"/>
				        </FormGroup>
				        <FormGroup>
				          <Label>Offers</Label>
				        	<div className="long-checkbox">
					          <Input id="c1" type="checkbox" />
					          <Label for="c1" check>Formation</Label>
				        	</div>
				        	<div className="long-checkbox">
					          <Input id="c2" type="checkbox" />
					          <Label for="c2" check>DPO</Label>
				        	</div>
				        	<div className="long-checkbox">
					          <Input id="c3" type="checkbox" />
					          <Label for="c3" check>Etc</Label>
				        	</div>
				        	<div className="long-checkbox">
					          <Input id="c4" type="checkbox" />
					          <Label for="c4" check>Etc</Label>
				        	</div>
				        </FormGroup>
				    </div>
					<div className="form-box confirm-box">
						<button>Create my DPO account</button>
					</div>
			      </Form>
			    </main>
			</div>
		)
	}
}

export default SignupPage