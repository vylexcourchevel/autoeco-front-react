import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
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
            const response = await axios.post('http://localhost:8002/api/users/login', formData, {
                withCredentials: true // Inclure les cookies dans la requête
            });
            console.log(response)
            if (response.status === 200) {
                navigate('/'); // Rediriger vers la page Home après connexion réussie
            }
        } catch (error) {
            setError('Email ou mot de passe incorrect');
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





// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8002/api/users/login', formData);
//             console.log(response);
//             // navigate('/');
//         } catch (error) {
//             console.error('Login error:', error);
//         }
//     };

//     const containerStyle = {
//         marginTop: '100px' // Décalage vers le bas de 100px
//     };

//     return (
//         <Container style={containerStyle}>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h3 className="text-center">Connexion</h3>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control 
//                                 type="email" 
//                                 placeholder="Entrez votre email" 
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required 
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formPassword">
//                             <Form.Label>Mot de passe</Form.Label>
//                             <Form.Control 
//                                 type="password" 
//                                 placeholder="Entrez votre mot de passe" 
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required 
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="mt-3">
//                             Connexion
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;
