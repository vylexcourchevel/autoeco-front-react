import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:8002/api/users/register', formData);
            console.log('User registered successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row className="w-100">
                <Col md={6} className="mx-auto p-4" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Vos coordonnées</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre nom" 
                                name="lastName" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                required 
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

                        <Button variant="primary" type="submit">
                            Enregistrer
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
