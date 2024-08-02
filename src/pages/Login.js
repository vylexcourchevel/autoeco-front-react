import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    // Utilisation du hook useState pour gérer l'état des champs du formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Utilisation du hook useNavigate pour la navigation après la connexion
    const navigate = useNavigate();

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            // Envoi des données du formulaire au backend via une requête POST
            const response = await axios.post('http://localhost:8002/api/users/login', formData);
            // Supposons que le jeton est retourné dans la réponse
            console.log(response);
            // Navigation vers la page d'accueil
            // navigate('/');
        } catch (error) {
            console.error('Login error:', error); // Aff
          }
        };
    
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h3>Connexion</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Entrez votre email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange} // Met à jour l'état lorsqu'il y a un changement dans le champ email
                                    required 
                                />
                            </Form.Group>
    
                            <Form.Group controlId="formPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Entrez votre mot de passe" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange} // Met à jour l'état lorsqu'il y a un changement dans le champ mot de passe
                                    required 
                                />
                            </Form.Group>
    
                            <Button variant="primary" type="submit">
                                Connexion
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    };
    
    export default Login;
