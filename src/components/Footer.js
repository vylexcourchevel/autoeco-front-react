import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Importation des icônes

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Première colonne : Plus d'informations */}
          <div className="col-md-4">
            <h5>Plus d'informations</h5>
            <ul className="list-unstyled">
              <li><a href="/contact" className="text-light">Nous contacter</a></li>
              <li><a href="/accessibility" className="text-light">Accessibilité aux sourds et malentendants</a></li>
              <li><a href="/faq" className="text-light">FAQ</a></li>
            </ul>
          </div>

          {/* Deuxième colonne : Informations légales */}
          <div className="col-md-4">
            <h5>Informations légales</h5>
            <ul className="list-unstyled">
              <li><a href="/rgpd" className="text-light">Informations légales RGPD</a></li>
              <li><a href="/terms" className="text-light">Conditions générales de location</a></li>
              <li><a href="/damage-policy" className="text-light">Traitement des dommages</a></li>
              <li><a href="/privacy-policy" className="text-light">Politiques de confidentialité</a></li>
              <li><a href="/insurance-conditions" className="text-light">Conditions d'assurance et protections</a></li>
            </ul>
          </div>

          {/* Troisième colonne : Réseaux sociaux */}
          <div className="col-md-4 text-center">
            <h5>Suivez-nous</h5>
            <div className="d-flex justify-content-center">
              <a href="https://www.facebook.com" className="text-light mx-2" aria-label="Facebook">
                <FaFacebook size={32} />
              </a>
              <a href="https://www.instagram.com" className="text-light mx-2" aria-label="Instagram">
                <FaInstagram size={32} />
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Mentions légales générales */}
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} AUTOECO. Tous droits réservés.</p>
          <p><a href="/legal" className="text-light">Mentions légales</a> | <a href="/rgpd" className="text-light">RGPD</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
