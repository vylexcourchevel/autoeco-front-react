

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8002/api/users/login', formData, {
                withCredentials: true
            });

            // Assurez-vous que la réponse contient les données nécessaires
            if (response.status === 200 && response.data) {
                
                console.log(response.data)
                // Mettre à jour le store Redux avec les informations de connexion
                dispatch(loginSuccess(response.data));

                // Rediriger vers la page d'accueil après une connexion réussie
                navigate('/');
            }
        } catch (error) {
            // Gérer les erreurs spécifiques en fonction des réponses du backend
            if (error.response && error.response.data) {
                // Utiliser le message d'erreur spécifique envoyé par le backend, s'il existe
                setError(error.response.data.message || 'Email ou mot de passe incorrect');
            } else {
                // Message d'erreur générique si aucun message spécifique n'est fourni
                setError('Une erreur s\'est produite lors de la connexion');
            }

            // Dispatch de l'échec de connexion avec le message d'erreur
            dispatch(loginFailure(error.message));

            console.error('Login error:', error);
        }
    };

    const containerStyle = {
        marginTop: '100px' // Décalage vers le bas de 100px
    };

    return (
        <Container style={containerStyle}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h3 className="text-center">Connexion</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
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

                        <Button variant="primary" type="submit" className="mt-3">
                            Connexion
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;



