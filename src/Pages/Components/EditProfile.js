import React, { Component } from 'react';
import { Form, Label, Input, FormText } from 'reactstrap';
import Place from 'react-algolia-places';
import codes from '../../Data/codes.json';
import suggestions from '../../Data/tag-suggestions.json';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';
import { ListGroup, ListGroupItem } from 'reactstrap';

class EditProfile extends Component {

      options = [];
      signedup = false;
      eraseCount = 0;

      constructor (props) {

        super(props);

        this.location = this.props.profile.location;
        this.tags = this.props.profile.tags.map(tag => ({ id: tag, text: tag }));
        this.areaList = this.props.profile.areas;
        Object.keys(codes).forEach(key => this.options.push({ value: key, label: codes[key] }));
      }

      componentDidMount () {

        document.getElementsByClassName("ap-input")[1].value = this.props.profile.location.name;
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

      confirmEdition () {

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function validateUrl(url) {
            var re = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
            return re.test(String(url).toLowerCase());
        }
        
        let website = document.getElementById("website-form").value;

        if (this.signedup || this.eraseCount >= 2) {}
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
            this.profileWarning("Veuillez indiquer au moins une offre.")
          else {

            let validateEdit = avatar => {

                this.props.api.editProfile(this.props.profile.id, {

                  avatar: avatar,
                  fullname: document.getElementById("fullname-form").value,
                  email: this.props.profile.email,
                  tags: this.tags.map(e => e.id),
                  resume: document.getElementById("bio-form").value,
                  offers: offers,
                  location: this.location,
                  areas: this.areaList,
                  publicEmail: document.getElementById("public-email-form").value === "" ? undefined : document.getElementById("public-email-form").value,
                  tel: document.getElementById("tel-form").value === "" ? undefined : document.getElementById("tel-form").value,
                  website: website === "" ? undefined : ((website.startsWith("http://") || website.startsWith("https://") ? "" : "http://") + website),
                  company: document.getElementById("company-form").value === "" ? undefined : document.getElementById("company-form").value
                }, () => this.hasCreatedProfile(), data => {

                  this.profileWarning("Vous avez été déconnecté.");
                  setTimeout(this.props.onCreateProfile, 3000);
                })
            }

            validateEdit = validateEdit.bind(this);

            if (document.getElementById("avatar-form").files.length === 0)
                validateEdit(this.props.profile.avatar);
            else
                this.props.api.uploadFile(document.getElementById("avatar-form").files[0], data => validateEdit(this.props.api.baseURL + "/assets/" + data[0]._id), err => { this.profileWarning("The upload of your image has failed."); })
          }
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
        box.innerHTML = "Votre profil a été édité. Les changements seront visibles après validation par un administrateur";
        box.classList.add("success");
        box.classList.remove("hidden-box");
        box.classList.remove("warning");
        setTimeout(this.props.onCreateProfile, 4000);
      }

      profileWarning (message) {

        let box = document.getElementById("signedup-box");
        box.innerHTML = message;
        box.classList.add("warning");
        box.classList.remove("hidden-box");
      }

      eraseProfile () {

        if (this.signedup !== true && this.eraseCount < 2) {

            let box = document.getElementById("erased-box");

            if (this.eraseCount < 1) {
                this.eraseCount++;
                box.classList.remove("hidden-box");
            } else {
                this.erasecount++;
                this.props.api.eraseProfile(this.props.profile.id, data => {

                    box.innerHTML = "Your profile has been erased.";
                    box.classList.add("success");
                    box.classList.remove("hidden-box");
                    box.classList.remove("warning");
                    setTimeout(this.props.onCreateProfile, 4000);
                }, err => {

                    box.innerHTML = "There was an error in erasing your profile. Try again later."
                })
            }
        }
      }

      render() {

            return (
                  <Form action="javascript:()=>{};" onSubmit={() => this.eraseProfile()}>
                        <div className="profile-box">
                              <div className="content-box">
                                    <div className="tri-box">
                                    </div>
                                    <div className="tri-box">
                                        <Label className="image-upload">
                                          <Input type="file" name="file" id="avatar-form" onChange={this.previewImage.bind(this)}/>
                                          <img id="avatar-preview" className="avatar" src={this.props.profile.avatar} alt="avatar"/>
                                        </Label>
                                    </div>
                                    <div className="tri-box">
                                    </div>
                                    <Input type="text" name="fullname" id="fullname-form" placeholder="Prénom NOM" defaultValue={this.props.profile.fullname}/>
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
                                    <input id="offer-1" type="checkbox" defaultChecked={this.props.profile.offers.includes(1)}/>
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-2" className="control control-checkbox">
                                DPO interne
                                    <input id="offer-2" type="checkbox" defaultChecked={this.props.profile.offers.includes(2)}/>
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-3" className="control control-checkbox">
                                DPO externe
                                    <input id="offer-3" type="checkbox" defaultChecked={this.props.profile.offers.includes(3)}/>
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-4" className="control control-checkbox">
                                Audit
                                    <input id="offer-4" type="checkbox" defaultChecked={this.props.profile.offers.includes(4)}/>
                                <div className="control_indicator"></div>
                            </Label>
                            <Label for="offer-5" className="control control-checkbox">
                                Assistance juridique
                                    <input id="offer-5" type="checkbox" defaultChecked={this.props.profile.offers.includes(5)}/>
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
                              <Input type="textarea" name="bio" id="bio-form" defaultValue={this.props.profile.resume}/>
                        </div>
                        <div className="profile-box">
                            <div className="content-box">
                                <h2>Informations de contact</h2>
                                <Input type="email" name="public-email" id="public-email-form" placeholder="Public email" defaultValue={this.props.profile.publicEmail}/>
                                <Input type="tel" name="tel" id="tel-form" placeholder="Téléphone" defaultValue={this.props.profile.tel}/>
                                <Input type="text" name="website" id="website-form" placeholder="Site web" defaultValue={this.props.profile.website}/>
                                <Input type="text" name="company-name" id="company-form" placeholder="Raison sociale" defaultValue={this.props.profile.company}/>
                                <FormText>Ces informations sont facultatives et seront visibles publiquement.</FormText>
                            </div>
                            <div className="content-box contact-box">
                              <button type="button" className="contact-button" onClick={() => this.confirmEdition()}>Enregistrer les changements</button>
                              <div id="signedup-box" className="ext-box hidden-box"></div>
                            </div>
                            <div className="content-box contact-box">
                              <button type="submit" className="contact-button warning-button">Supprimer le profil</button>
                              <div id="erased-box" className="ext-box warning hidden-box"><b>En êtes-vous certain ?</b><br/>(Cliquez une seconde fois pour valider)</div>
                            </div>
                        </div>
                  </Form>
            )
      }
}

export default EditProfile