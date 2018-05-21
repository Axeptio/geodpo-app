import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge, Tooltip, Collapse } from 'reactstrap';
import codes from '../../Data/codes.json'

class Profile extends Component {

      state = {
            tooltipOpen: 0,
            collapseContact: false
      }

      switchTooltip (num) {

            this.setState({tooltipOpen: this.state.tooltipOpen === 0 ? num : 0})
      }

      toggleContactData () {

            this.setState({ collapseContact: !this.state.collapseContact });
      }

	render() {

            function codeToMissionName (code) {

                  switch (code) {
                        case 1: return { name: "Formation", description: "Réalise des sessions de formation (DPO, salariés, manager etc…)" }
                        case 2: return { name: "DPO interne", description: "Ouvert à un recrutement en interne en tant que délégué à la protection des données" }
                        case 3: return { name: "DPO externe", description: "Ouvert à des missions externes en tant que délégué à la protection des données" }
                        case 4: return { name: "Audit", description: "Réalisation du PIA, mise a jour des registres pour la conformité RGPD" }
                        case 5: return { name: "Assistance juridique", description: "Réalisation des CGU,CGV, EULA, mise à jour des contrats de privacy…" }
                        default: return { name: "?", description: "Ceci est une erreur." }
                  }
            }

		return (
			<div>
      			<div className="profile-box">
      				<div className="content-box">
      					<div className="tri-box">
      						<img className="avatar" src={this.props.profile.avatar} alt="avatar"/>
      					</div>
      					<div className="tri-box double-tri-box">
      						<h2 className="full-name">{this.props.profile.fullname}</h2>
			      			<div className="tag-list profile-tag-list">
			      				{ this.props.profile.tags.map(tag => <span key={"tag-" + tag} className="tag" onClick={() => this.props.onSearch(tag)}>{tag}</span>) }
			      			</div>
      					</div>
      				</div>
      				<div className="content-box contact-box">
                              {
                                    this.props.profile.publicEmail === undefined && this.props.profile.tel === undefined && this.props.profile.website === undefined && this.props.profile.company === undefined ?
                                    <div className="locked expand-text">Aucune information spécifiée</div> :
                                    <div>
            					<div className="expand-text" onClick={() => this.toggleContactData()}>
                                                Afficher les informations
                                                <svg className="expand-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 306 306">
                                                <g><g id="expand-more"><polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35            "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                                </svg>
                                          </div>
                                          <Collapse isOpen={this.state.collapseContact} id="contact-data">
                                          {
                                                this.props.profile.publicEmail !== undefined ?
                                                      <div className="contact-info">
                                                            <svg className="contact-icon" version="1.1" viewBox="0 0 1691 1407">
                                                                  <g id="packet"><path d="M1691,165.177C1691,73.952,1617.048,0,1525.823,0H165.177C73.952,0,0,73.952,0,165.177v1076.646   C0,1333.048,73.952,1407,165.177,1407h1360.646c91.225,0,165.177-73.952,165.177-165.177V165.177z M166.062,132h1361.057   c18.216,0,32.881,14.528,32.881,32.746v1.433L869.916,856.337c-8.417,8.417-18.208,9.675-23.318,9.675   c-5.11,0-14.934-1.258-23.353-9.675L133,166.085v-1.339C133,146.528,147.846,132,166.062,132z M1527.119,1275H166.062   c-18.216,0-33.062-15.084-33.062-33.301V352.961l596.826,596.816c31.198,31.197,72.684,48.376,116.803,48.376   c44.125-0.003,85.528-17.186,116.724-48.382L1560,353.054v888.645C1560,1259.916,1545.335,1275,1527.119,1275z"/></g><g id="Layer_1"/>
                                                            </svg>
                                                            <span className="contact-text">
                                                                  {this.props.profile.publicEmail}
                                                            </span>
                                                      </div> :
                                                      <span/>
                                          }
                                          {
                                                this.props.profile.tel !== undefined ?
                                                      <div className="contact-info">
                                                            <svg className="contact-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 414.937 414.937">
                                                                   <g><path d="M159.138,256.452c37.217,36.944,80.295,72.236,97.207,55.195c24.215-24.392,39.12-45.614,92.854-2.761
                                                                        c53.734,42.874,12.696,71.727-10.757,95.363c-27.064,27.269-128.432,1.911-228.909-97.804C9.062,206.71-17.07,105.54,10.014,78.258
                                                                        c23.46-23.637,52.006-64.879,95.254-11.458c43.269,53.394,22.161,68.462-2.054,92.861
                                                                        C86.31,176.695,121.915,219.501,159.138,256.452z M213.104,80.203c0,0-11.227-1.754-19.088,6.113
                                                                        c-8.092,8.092-8.445,22.032,0.082,30.552c5.039,5.039,12.145,6.113,12.145,6.113c13.852,2.598,34.728,6.997,56.944,29.206
                                                                        c22.209,22.208,26.608,43.084,29.206,56.943c0,0,1.074,7.106,6.113,12.145c8.521,8.521,22.46,8.174,30.552,0.082
                                                                        c7.861-7.86,6.113-19.087,6.113-19.087c-4.399-28.057-17.999-57.365-41.351-80.716C270.462,98.203,241.153,84.609,213.104,80.203z
                                                                         M318.415,96.958c40.719,40.719,58.079,86.932,52.428,124.379c0,0-1.972,11.859,5.773,19.604
                                                                        c8.718,8.718,22.535,8.215,30.695,0.062c5.243-5.243,6.385-13.777,6.385-13.777c4.672-32.361-1.203-97.464-64.647-160.901
                                                                        C285.605,2.887,220.509-2.988,188.147,1.677c0,0-8.527,1.136-13.777,6.385c-8.16,8.16-8.656,21.978,0.061,30.695
                                                                        c7.746,7.746,19.604,5.773,19.604,5.773C231.484,38.879,277.696,56.24,318.415,96.958z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                                            </svg>
                                                            <span className="contact-text">
                                                                  {this.props.profile.tel}
                                                            </span>
                                                      </div> :
                                                      <span/>
                                          } 
                                          {
                                                this.props.profile.website !== undefined ?
                                                      <div className="contact-info">
                                                            <svg className="contact-icon" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 1000 1000">
                                                                  <path d="M560.95,1000c-1.17,0-3.978-1.177-5.147-2.587c35.213-23.753,68.203-51.385,98.152-84.311
                                                                  c38.138-42.216,68.203-88.194,91.951-136.995h172.789c-18.133,28.928-40.594,55.268-64.109,80.313
                                                                  C774.684,936.855,671.151,986.948,560.95,1000 M934.605,524.34H1000c-2.574,69.967-20.824,137.114-51.006,198.967H769.42
                                                                  c23.631-63.264,36.617-130.41,39.307-198.967h73.468 M882.195,473.073h-73.468c-3.978-69.852-18.484-139.583-44.572-205.671h52.41
                                                                  h51.24h77.328c32.639,63.382,51.006,133.116,54.867,205.671h-65.395 M816.565,216.135h-75.924
                                                                  c-22.461-44.804-51.24-88.312-85.283-126.531c-30.182-32.926-64.342-60.676-99.555-84.311c1.17-1.414,2.574-1.414,2.574-1.414
                                                                  L556.972,0C669.747,13.052,773.28,63.145,854.586,143.581c22.344,22.458,42.115,46.096,58.961,72.555h-45.742 M703.79,267.402
                                                                  c28.896,64.678,44.572,134.408,48.549,204.257H519.069V267.402H703.79z M677.702,214.721H519.069V47.388
                                                                  c34.043,22.343,65.629,48.683,94.408,80.435C638.395,155.455,659.219,184.383,677.702,214.721 M568.905,723.307h-51.24V525.754
                                                                  h233.388c-2.691,67.143-17.08,134.29-43.285,197.553h-86.57 M621.198,776.106h61.652c-19.537,34.336-43.285,67.261-70.777,97.481
                                                                  c-28.896,31.634-60.365,59.384-94.408,81.609v-179.09h51.24 M314.459,216.135c17.197-30.342,39.307-60.68,62.939-87.02
                                                                  c27.609-30.22,56.504-55.383,89.261-76.434v163.454H314.459z M307.908,776.106h158.751v175.329
                                                                  c-32.756-21.166-61.652-47.506-89.261-77.848C350.023,844.663,327.562,810.442,307.908,776.106 M323.701,473.073h-85.049
                                                                  c3.861-69.852,19.654-139.583,48.433-204.257h179.574v204.257h-90.547 M376.111,525.754h90.547v197.553H281.82
                                                                  c-26.322-61.853-40.711-130.41-43.168-197.553h85.049 M431.095,1.292v1.295c0,1.292,1.521,1.292,2.808,1.292
                                                                  c-35.33,23.638-68.086,52.799-98.269,85.725c-35.564,38.219-64.342,80.317-86.57,125.117H86.453
                                                                  c18.367-25.045,38.02-48.683,59.078-71.141C224.146,64.559,323.701,15.758,431.095,1.292 M145.531,856.419
                                                                  c-24.918-25.045-45.976-52.681-64.226-81.724h161.207c24.918,50.212,55.1,96.189,93.121,137.11
                                                                  c30.182,32.926,62.939,61.853,98.269,85.606c-1.287,0-2.808,1.41-2.808,1.41C323.701,984.361,224.146,935.441,145.531,856.419
                                                                   M58.961,471.659H0c3.978-71.141,23.631-140.875,54.984-204.257h170.449c-26.088,66.088-40.594,134.408-44.689,204.257h-70.777
                                                                   M109.967,524.34h70.777c2.808,68.557,15.793,135.703,39.307,198.967H51.123C20.941,661.454,3.978,594.307,0,524.34h58.961"/>
                                                            </svg>
                                                            <span className="contact-text">
                                                                  <a href={this.props.profile.website} target="_blank">{this.props.profile.website}</a>
                                                            </span>
                                                      </div> :
                                                      <span/>
                                          } 
                                          {
                                                this.props.profile.company !== undefined ?
                                                      <div className="contact-info">
                                                            <svg className="contact-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 476.518 476.518"><g>
                                                                  <path d="M276.619,38.115c-2.046-3.158-2.703-5.292-2.703-5.292l0.975-0.897c0,0,1.896,0.788,5.21,2.146
                                                                        c1.564,0.624,3.479,1.39,5.674,2.254c2.162,0.783,4.515,1.696,7.037,2.308c1.242,0.385,2.507,0.768,3.814,0.915
                                                                        c0.658,0.087,1.285,0.268,1.937,0.388c0.646,0.044,1.294,0.065,1.938,0.147c2.605,0.35,5,0.067,7.626-0.07
                                                                        c1.218-0.448,2.572-0.574,3.897-1.144c1.214-0.717,2.801-1.133,3.928-2.052c0.597-0.41,1.217-0.837,1.882-1.259
                                                                        c0.69-0.388,1.424-0.695,2.157-1.488l4.64-3.896c0.044-0.06-0.271,0.399-0.12,0.185l0.032-0.033l0.079-0.07l0.153-0.131
                                                                        l0.305-0.273l0.612-0.547l1.217-1.067l2.297-2.178c1.444-1.488,3.261-2.648,4.717-4.082c1.434-1.484,3.361-2.392,4.894-3.831
                                                                        c1.64-1.292,3.557-2.26,5.406-3.513c3.885-1.828,8.425-3.185,12.49-2.615c1.019,0.109,2.009,0.268,2.983,0.448
                                                                        c0.942,0.262,1.827,0.586,2.703,0.914c1.794,0.592,3.339,1.439,4.795,2.276c2.909,1.681,5.221,3.628,7.069,5.511
                                                                        c1.837,1.888,3.218,3.727,4.212,5.33c1.042,1.569,1.644,2.955,2.068,3.902c0.351,0.974,0.536,1.499,0.536,1.499l-0.974,0.908
                                                                        c0,0-2.089-0.706-5.297-2.047c-1.563-0.623-3.459-1.405-5.635-2.281c-2.101-0.865-4.412-1.817-6.853-2.643
                                                                        c-1.215-0.449-2.472-0.914-3.742-1.221c-0.645-0.158-1.279-0.411-1.927-0.596c-0.646-0.131-1.29-0.296-1.938-0.509
                                                                        c-2.621-0.854-5.329-1.696-8.682-2.046c-1.54,0.203-3.379,0.137-4.981,0.805c-1.541,0.782-3.311,1.384-4.548,2.774
                                                                        c-1.247,1.34-2.67,2.512-3.544,4.219l-1.271,2.544l-0.584,1.281l-0.284,0.635l-0.14,0.328l-0.07,0.147l-0.033,0.077l-0.022,0.049
                                                                        c0.126-0.186-0.196,0.296-0.174,0.268l-2.501,5.516c-0.821,1.779-2.704,3.787-4.241,5.554c-1.56,1.926-3.649,3.032-5.509,4.542
                                                                        c-1.947,1.368-4.324,2.156-6.5,3.146c-4.631,1.323-9.469,1.56-13.54,0.471c-2.079-0.459-3.992-1.062-5.678-1.937
                                                                        c-1.765-0.745-3.286-1.674-4.72-2.572c-2.85-1.887-5.109-3.885-6.894-5.844C278.973,41.573,277.622,39.702,276.619,38.115z
                                                                         M476.518,351.03v113.6H0v-113.6h32.459V223.42l91.47-64.177v64.177l91.456-64.177v64.177l91.475-64.177v126.143h31.56
                                                                        l17.14-223.139h52.313l15.002,223.139h35.196v65.653h18.446V351.03z M149.375,301.975H77.461v66.387h71.914V301.975z
                                                                         M273.293,301.975h-71.916v66.387h71.916V301.975z M398.768,301.975h-71.914v66.387h71.914V301.975z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                                                            </svg>
                                                            <span className="contact-text">
                                                                  {this.props.profile.company}
                                                            </span>
                                                      </div> :
                                                      <span/>
                                          }
                                          </Collapse>
                                    </div>
                              }
      				</div>
	      		</div>
                        <div className="profile-box content-box">
                              <h2>Offres</h2>
                              <div className="offer-list">
                              { this.props.profile.offers.map(offer =>
                                    <span key={"offer-" + offer}>
                                          <Badge id={"offer-" + offer}>
                                                {codeToMissionName(offer).name}
                                          </Badge>
                                          <Tooltip placement="top" isOpen={this.state.tooltipOpen === offer} target={"offer-" + offer} toggle={() => this.switchTooltip(offer)}>
                                                {codeToMissionName(offer).description}
                                          </Tooltip>
                                    </span>
                              )}
                              </div>
                        </div>
                        {
                        this.props.profile.resume === "" || this.props.profile.resume === undefined ? <div/> :
                              <div className="profile-box content-box">
                                    <h2>Résumé</h2>
                                    <div className="bio-content" dangerouslySetInnerHTML={{ __html: this.props.profile.resume}}/>
                              </div>
                        }
      			<div className="profile-box content-box">
	      			<h2>Zones d'intervention</h2>
                              <ListGroup>
                                    { this.props.profile.areas.map(tag => <ListGroupItem key={"area-" + tag}>{codes[tag]}</ListGroupItem>) }
                              </ListGroup>
      			</div>
      		</div>
		)
	}
}

export default Profile