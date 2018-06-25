import React, { Component } from 'react';
import { Form, Label, Input, FormText, Button } from 'reactstrap';
import Place from 'react-algolia-places';
import codes from '../../Data/codes.json';
import suggestions from '../../Data/tag-suggestions.json';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';
import { ListGroup, ListGroupItem } from 'reactstrap';
import CKEditor from "react-ckeditor-component";
import Axeptio, { AxeptioCheckbox } from '../../Axeptio/Axeptio';

class ProfileMaker extends Component {

      options = [];
      areaList = [];
      tags = [];
      signedup = false;
      state = {
        accept: false,
        token: null
      };

      constructor (props) {

        super(props);

        Object.keys(codes).forEach(key => this.options.push({ value: key, label: codes[key] }));
      }

      componentDidMount() {

        document.getElementById("fullname-form").focus();
      }

      previewImage() {

        var oFReader = new FileReader();
        //this.fileUpload(document.getElementById("avatar-form").files[0]);
        oFReader.readAsDataURL(document.getElementById("avatar-form").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("avatar-preview").src = oFREvent.target.result;
        }
      }

      onSelectArea (area) {

        if (this.areaList.indexOf(area.value) < 0) {
          this.areaList.push(area.value);
          this.forceUpdate();
        }
      }

      onUnselectArea (area) {

        this.areaList[area] = this.areaList.splice(this.areaList.indexOf(area), 1);
        this.forceUpdate();
      }

      onAddTag (tag) {

        this.tags.push(tag);
      }

      onDeleteTag(i) {
        
        this.tags = this.tags.filter((tag, index) => index !== i);
        this.forceUpdate();
      }

      onDragTag(tag, currPos, newPos) {

        const newTags = this.tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        this.tags = newTags;
        this.forceUpdate();
      }

      filteredSuggestions(query, suggestions) {

        return suggestions.filter(item => item.text.toLowerCase().indexOf(query.toLowerCase()) === 0).concat(
          suggestions.filter(item => item.text.toLowerCase().indexOf(query.toLowerCase()) > 0)
        ).filter((value, index) => index < 6);
      }

      confirmInscription () {

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function validateUrl(url) {
            var re = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{1,20}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
            return re.test(String(url).toLowerCase());
        }
        
        let website = document.getElementById("website-form").value;

        if (this.signedup) {}
        else if (!validateEmail(document.getElementById("email-form").value))
          this.profileWarning("Veuillez entrer un email valide.");
        else if (document.getElementById("password-form").value.length < 8)
          this.profileWarning("Votre mot de passe doit comporter au moins 8 caractères.");
        else if (document.getElementById("fullname-form").value.length < 5)
          this.profileWarning("Veuillez entrer votre nom complet.");
        else if (this.location === undefined)
          this.profileWarning("Veuillez indiquer votre localisation.");
        else if (this.areaList.length < 1)
          this.profileWarning("Veuillez indiquer au moins une zone d'intervention.");
        else if (document.getElementById("public-email-form").value !== "" && !validateEmail(document.getElementById("public-email-form").value))
          this.profileWarning("Veuillez entrer un email public valide.");
        else if (website !== "" && !validateUrl(website))
          this.profileWarning("Veuillez indiquer une url de site web valide.");
        else {

          var offers = [];
          [1, 2, 3, 4, 5].forEach(i => {
          if (document.getElementById("offer-" + i).checked)
            offers.push(i);
          })

          /*this.props.api.submitProfile({

            avatar: "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png",
            fullname: document.getElementById("fullname-form").value,
            email: "placeholder",
            tags: this.tags.map(e => e.id),
            resume: document.getElementById("bio-form").value,
            offers: offers,
            location: this.location,
            areas: this.areaList
          }, () => console.log("ok"))*/
          //this.props.api.client.post("/auth/local/signin", { username: "toto@tata.com", password: "toto" }).then(data => console.log(data.data));
        
          if (offers.length < 1)
            this.profileWarning("Veuillez indiquer au moins une offre")
          else
            this.props.api.auth({
              email: document.getElementById("email-form").value,
              username: document.getElementById("email-form").value,
              displayName: document.getElementById("fullname-form").value,
              password: document.getElementById("password-form").value
            }, "signup", data => {

              let validateProfile = avatar => {
                this.props.api.submitProfile({

                  avatar: avatar,
                  fullname: document.getElementById("fullname-form").value,
                  email: document.getElementById("email-form").value,
                  tags: this.tags.map(e => e.id),
                  resume: this.refs.cke.editorInstance.getData(),
                  offers: offers,
                  location: this.location,
                  areas: this.areaList,
                  publicEmail: document.getElementById("public-email-form").value === "" ? undefined : document.getElementById("public-email-form").value,
                  tel: document.getElementById("tel-form").value === "" ? undefined : document.getElementById("tel-form").value,
                  website: website === "" ? undefined : ((website.startsWith("http://") || website.startsWith("https://") ? "" : "http://") + website),
                  company: document.getElementById("company-form").value === "" ? undefined : document.getElementById("company-form").value,
                  axeptioToken: this.state.token
                }, () => this.hasCreatedProfile(), data => {

                  this.profileWarning("Vous avez été déconnecté.");
                  setTimeout(this.props.onCreateProfile, 3000);
                })
              }

              if (document.getElementById("avatar-form").files.length === 0)
                validateProfile("/placeholder");
              else
                this.props.api.uploadFile(document.getElementById("avatar-form").files[0], data => validateProfile(this.props.api.baseURL + "/assets/" + data[0]._id), data => {

                  this.profileWarning("Le téléchargement de votre image de profil a échoué.");
                })
            }, data => {

              this.profileWarning("Cette adresse email a déjà été enregistrée.");
            })
        }
      }

      selectCity (data) {

        this.location = {
              latlng : data.suggestion.latlng,
              name : data.suggestion.value
        }
      }

      hasCreatedProfile () {

        this.signedup = true;
        let box = document.getElementById("signedup-box");
        box.innerHTML = "Votre profil a été créé. Il sera visible après validation par un administrateur";
        box.classList.add("success");
        box.classList.remove("hidden-box");
        box.classList.remove("warning");
        var name = document.getElementById("fullname-form").value;
        window.$crisp.push(["do", "message:send", ["text", `${name} a créé son profil.`]]);
        setTimeout(this.props.onCreateProfile, 4000);
      }

      profileWarning (message) {

        let box = document.getElementById("signedup-box");
        box.innerHTML = message;
        box.classList.add("warning");
        box.classList.remove("hidden-box");
      }

      render() {

            return (
                  <Form onSubmit={e => {e.preventDefault();this.confirmInscription();}}>
                        <div id="profile-maker" className="profile-box">
                              <div className="content-box">
                                    <div className="tri-box">
                                    </div>
                                    <div className="tri-box">
                                        <Label className="image-upload">
                                          <Input type="file" name="file" id="avatar-form" onChange={this.previewImage.bind(this)}/>
                                          <img id="avatar-preview" className="avatar" src={"/placeholder"} alt="avatar"/>
                                          <div className="upload-box-info">
                                            <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                               viewBox="0 0 512 512">
                                            <path d="M398.1,233.2c0-1.2,0.2-2.4,0.2-3.6c0-65-51.8-117.6-115.7-117.6c-46.1,0-85.7,27.4-104.3,67c-8.1-4.1-17.2-6.5-26.8-6.5
                                              c-29.5,0-54.1,21.9-58.8,50.5C57.3,235.2,32,269.1,32,309c0,50.2,40.1,91,89.5,91H224v-80l-48.2,0l80.2-83.7l80.2,83.6l-48.2,0v80
                                              h110.3c45.2,0,81.7-37.5,81.7-83.4C480,270.6,443.3,233.3,398.1,233.2z"/>
                                            </svg>
                                          </div>
                                        </Label>
                                    </div>
                                    <div className="tri-box">
                                    </div>
                                    <Input type="text" name="fullname" id="fullname-form" placeholder="Prénom NOM"/>
                              </div>
                              <div className="content-box">
                                    <Place onChange={this.selectCity.bind(this)} type="city"/>
                              </div>
                        </div>
                        <div className="profile-box">
                          <div className="content-box">
                            <h2>Offres</h2>
                            <Label for="offer-1" className="control control-checkbox">
                                Formation
                                    <input id="offer-1" type="checkbox" />
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-2" className="control control-checkbox">
                                DPO interne
                                    <input id="offer-2" type="checkbox" />
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-3" className="control control-checkbox">
                                DPO externe
                                    <input id="offer-3" type="checkbox" />
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-4" className="control control-checkbox">
                                Audit
                                    <input id="offer-4" type="checkbox" />
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-5" className="control control-checkbox">
                                Assistance juridique
                                    <input id="offer-5" type="checkbox" />
                                <div className="control_indicator"></div>
                            </Label>
                          </div>
                          <div className="content-box">
                            <h2>Secteurs d'activité</h2>
                            <div className="tag-list">
                                <ReactTags tags={this.tags}
                                    suggestions={suggestions.suggestions}
                                    placeholder="Ajouter un tag"
                                    handleDelete={this.onDeleteTag.bind(this)}
                                    handleAddition={this.onAddTag.bind(this)}
                                    handleDrag={this.onDragTag.bind(this)}
                                    handleFilterSuggestions={this.filteredSuggestions}
                                    minQueryLength={1}
                                    maxLength = "20"/>
                            </div>
                          </div>
                        </div>
                        <div className="profile-box">
                              <div className="content-box">
                                <h2>Zones d'intervention</h2>
                                <div className="tag-list">
                                  <Select
                                    name="form-field-name"
                                    options={this.options}
                                    onChange={this.onSelectArea.bind(this)}
                                  />
                                  <ListGroup>
                                        { this.areaList.map(tag => <ListGroupItem key={"area-" + tag}>{codes[tag]}<span className="delete-bullet" onClick={() => this.onUnselectArea(tag)}>&times;</span></ListGroupItem>) }
                                  </ListGroup>
                                </div>
                              </div>
                        </div>
                        <div className="profile-box content-box">
                              <h2>Résumé</h2>
                              <CKEditor ref="cke" name="bio" id="bio-form" config={{
                                  language: 'fr',
                                  uiColor: '#f2f4f7',
                                  removePlugins: 'elementspath',
                                  toolbarGroups: [
                                    { name: 'basicstyles', groups: [ 'basicstyles' ] }, 
                                    { name: 'links' }, 
                                    { name: 'paragraph',   groups: [ 'list', 'indent' ] }
                                  ]
                              }}/>
                        </div>
                        <div className="profile-box">
                            <div className="content-box">
                                <h2>Informations de contact</h2>
                                <Input type="email" name="public-email" id="public-email-form" placeholder="Public email"/>
                                <Input type="tel" name="tel" id="tel-form" placeholder="Téléphone"/>
                                <Input type="text" name="website" id="website-form" placeholder="Site web"/>
                                <Input type="text" name="company-name" id="company-form" placeholder="Raison sociale"/>
                                <FormText>Ces informations sont facultatives et seront visibles publiquement.</FormText>
                            </div>
                            <div className="content-box">
                                <h2>Informations de connexion</h2>
                                <Input type="email" name="email" id="email-form" placeholder="Email"/>
                                <Input type="password" name="password" id="password-form" placeholder="Mot de passe"/>
                                <FormText>Ces informations seront nécessaires pour modifier votre profil.</FormText>
                            </div>
                            <div className="content-box contact-box">
                              <Axeptio clientId="5b1a2dd8f789aa488047b85f" onToken={ token => this.setState({ token }) }>
                                <AxeptioCheckbox onChange={checked => { this.setState({accept: checked}); }} name="lacartedesdpocgu" data='{"lang":"FR","id":"lacartedesdpocgu","type":"doc"}'/>
                              </Axeptio>
                              <Button type="submit" className="contact-button" disabled={ !this.state.accept }>Confirmer l'inscription</Button>
                              <div id="signedup-box" className="ext-box hidden-box"></div>
                            </div>
                        </div>
                  </Form>
            )
      }
}

export default ProfileMaker