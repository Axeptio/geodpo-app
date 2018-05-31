import React, { Component } from 'react';
import { Button } from 'reactstrap';

class HelpLightbox extends Component {

	render () {

		return(
			<div className="lightbox-container">
				<div className="lightbox-inner" onClick={() => this.props.onClose()}>
					<div className="lightbox" onClick={e => e.stopPropagation()}>
						<div className="lightbox-body">
							<div className="lightbox-section">
								<p>
									Pour piloter la gouvernance des données personnelles de votre structure, vous aurez besoin d'un véritable chef d'orchestre
									qui exerce une mission d'information, de conseil et de contrôle en interne : le délégué à la protection des données. Cela tombe
									bien, on vous aide à en trouver un près de chez vous.
								</p>
							</div>
							<div className="lightbox-section">
								<a target="_blank" className="lightbox-link" href="https://www.cnil.fr/fr/dpo-par-ou-commencer">C'est quoi un DPO ?</a>
								<a target="_blank" className="lightbox-link" href="https://www.cnil.fr/fr/designer-un-pilote">Qui a besoin d'un DPO ?</a>
								<a target="_blank" className="lightbox-link" href="https://www.cnil.fr/fr/rgpd-par-ou-commencer">Mais au fait, c'est quoi le RGPD ?</a>
							</div>
							<div className="lightbox-section">
								<Button color="secondary" onClick={() => this.props.onCreateProfile()}>Je veux être référencé sur cette carte</Button>
								<Button color="primary" onClick={() => this.props.onClose()}>Montrez-moi les DPO près de chez moi</Button>
							</div>
						</div>
						<div className="lightbox-footer">
							<div className="big footer-box">
								<p>
									<b>Qui sommes-nous ?</b><br/>
									Axeptio est une société Montpelliéraine qui propose aux sociétés de garantir l'authenticité et la traçabilité des consentements
									dans le cadre du nouveau RGPD.
								</p>
							</div>
							<div className="little footer-box">
								<a target="_blank" href="https://www.axeptio.eu"><Button outline color="secondary">Découvrir Axeptio</Button></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HelpLightbox;