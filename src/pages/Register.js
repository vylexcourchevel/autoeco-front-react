import React, { useState } from 'react'; // Importation de React et du hook useState
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importation des composants de React Bootstrap
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate pour la navigation
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP

const Register = () => {
    // Initialisation de l'état formData pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });

    // Initialisation de useNavigate pour la navigation
    const navigate = useNavigate();

    // Gestion des modifications des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target; // Extraction du nom et de la valeur du champ modifié
        setFormData({
            ...formData, // Copie de l'état actuel
            [name]: value // Mise à jour de la valeur du champ modifié
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        try {
            const response = await axios.post('http://localhost:8002/api/users/register', formData); // Envoi des données au backend
            console.log('User registered successfully:', response.data); // Affiche la réponse en cas de succès
            navigate('/'); // Redirection vers la page 'home' après une soumission réussie
        } catch (error) {
            console.error('There was an error registering the user!', error); // Affiche une erreur en cas d'échec
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h3>Vos coordonnées</h3>
                    <Form onSubmit={handleSubmit}> {/* Déclenche handleSubmit lors de la soumission */}
                        <Form.Group controlId="formLastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre nom" 
                                name="lastName" // Nom du champ pour identifier l'état
                                value={formData.lastName} // Valeur actuelle de lastName dans l'état
                                onChange={handleChange} // Déclenche handleChange lors d'une modification
                                required // Rend ce champ obligatoire
                            />
                        </Form.Group>

                        <Form.Group controlId="formFirstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre prénom" 
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Entrez votre email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre adresse" 
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Numéro de téléphone</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre numéro de téléphone" 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Entrez votre mot de passe" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit"> {/* Bouton de soumission */}
                            Enregistrer
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    {/* Cet espace peut être utilisé pour autre chose ou laissé vide */}
                </Col>
            </Row>
        </Container>
    );
};

export default Register; // Exportation du composant Register
