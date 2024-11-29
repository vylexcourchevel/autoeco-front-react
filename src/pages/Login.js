
import React, { useState, useEffect } from 'react';
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
    const [message, setMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Soumettre le formulaire pour se connecter
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8002/api/users/login', formData, {
                withCredentials: true
            });

            if (response.status === 200 && response.data) {
                // Mise à jour du store Redux
                dispatch(loginSuccess(response.data));

                // Affichage du message de succès
                setShowSuccessMessage(true);

                // Redirection basée sur le rôle de l'utilisateur
                if (response.data.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Email ou mot de passe incorrect');
            } else {
                setError('Une erreur s\'est produite lors de la connexion');
            }
            dispatch(loginFailure(error.message));
            console.error('Login error:', error);
        }
    };

    // Soumettre la demande de réinitialisation de mot de passe
    const handleForgotPasswordSubmit = async (email) => {
        try {
            const response = await axios.post('http://localhost:8002/api/users/forgot-password', { email });
            if (response.status === 200) {
                setMessage('Un email avec les instructions de réinitialisation a été envoyé.');
                setError('');
            }
        } catch (err) {
            setError('Une erreur s\'est produite, vérifiez votre email.');
            setMessage('');
        }
    };

    const ForgotPassword = () => {
        const [email, setEmail] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            handleForgotPasswordSubmit(email);
        };

        return (
            <div>
                <h3 className="text-center">Réinitialisation du mot de passe</h3>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formResetEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Envoyer
                    </Button>
                </Form>
                <Button variant="link" onClick={() => setIsForgotPassword(false)} className="mt-2">
                    Retour à la connexion
                </Button>
            </div>
        );
    };

    const containerStyle = {
        marginTop: '100px' // Décalage vers le bas de 100px
    };

    // Vérification de l'état de la connexion et redirection après succès
    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        if (token) {
            navigate('/'); // Redirigez vers la page d'accueil si l'utilisateur est déjà connecté
        }
    }, [navigate]);

    return (
        <Container style={containerStyle}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {showSuccessMessage && (
                        <Alert variant="success" className="text-center">
                            Félicitations, vous êtes bien identifié !
                        </Alert>
                    )}
                    {isForgotPassword ? (
                        <ForgotPassword /> // Affiche la page de réinitialisation du mot de passe
                    ) : (
                        <div>
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
                                <Button variant="link" onClick={() => setIsForgotPassword(true)} className="mt-2">
                                    Mot de passe oublié ?
                                </Button>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [isForgotPassword, setIsForgotPassword] = useState(false); // État pour basculer entre connexion et réinitialisation

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

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
//             const response = await axios.post('http://localhost:8002/api/users/login', formData, {
//                 withCredentials: true
//             });

//             if (response.status === 200 && response.data) {
//                 console.log(response.data);

//                 // Mettre à jour le store Redux avec les informations de connexion
//                 dispatch(loginSuccess(response.data));

//                 // Afficher le message de succès
//                 setShowSuccessMessage(true);

//                 // Redirection basée sur le rôle de l'utilisateur
//                 if (response.data.isAdmin) {
//                     navigate('/admin'); // Redirige vers la page admin si l'utilisateur est un administrateur
//                 } else {
//                     navigate('/'); // Redirige vers la page d'accueil pour les utilisateurs simples
//                 }
//             }
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 setError(error.response.data.message || 'Email ou mot de passe incorrect');
//             } else {
//                 setError('Une erreur s\'est produite lors de la connexion');
//             }

//             dispatch(loginFailure(error.message));
//             console.error('Login error:', error);
//         }
//     };

//     const handleForgotPasswordSubmit = async (email) => {
//         try {
//             const response = await axios.post('http://localhost:8002/api/users/forgot-password', { email });
//             if (response.status === 200) {
//                 setMessage('Un email avec les instructions de réinitialisation a été envoyé.');
//                 setError('');
//             }
//         } catch (err) {
//             setError('Une erreur s\'est produite, vérifiez votre email.');
//             setMessage('');
//         }
//     };

//     const ForgotPassword = () => {
//         const [email, setEmail] = useState('');

//         const handleSubmit = (e) => {
//             e.preventDefault();
//             handleForgotPasswordSubmit(email);
//         };

//         return (
//             <div>
//                 <h3 className="text-center">Réinitialisation du mot de passe</h3>
//                 {message && <Alert variant="success">{message}</Alert>}
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formResetEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Entrez votre email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" className="mt-3">
//                         Envoyer
//                     </Button>
//                 </Form>
//                 <Button variant="link" onClick={() => setIsForgotPassword(false)} className="mt-2">
//                     Retour à la connexion
//                 </Button>
//             </div>
//         );
//     };

//     const containerStyle = {
//         marginTop: '100px' // Décalage vers le bas de 100px
//     };

//     return (
//         <Container style={containerStyle}>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     {showSuccessMessage && (
//                         <Alert variant="success" className="text-center">
//                             Félicitation, vous êtes bien identifié !
//                         </Alert>
//                     )}
//                     {isForgotPassword ? (
//                         <ForgotPassword /> // Appel à la fonction ForgotPassword
//                     ) : (
//                         <div>
//                             <h3 className="text-center">Connexion</h3>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group controlId="formEmail">
//                                     <Form.Label>Email</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         placeholder="Entrez votre email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group controlId="formPassword">
//                                     <Form.Label>Mot de passe</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         placeholder="Entrez votre mot de passe"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </Form.Group>

//                                 <Button variant="primary" type="submit" className="mt-3">
//                                     Connexion
//                                 </Button>
//                                 <Button variant="link" onClick={() => setIsForgotPassword(true)} className="mt-2">
//                                     Mot de passe oublié ?
//                                 </Button>
//                             </Form>
//                         </div>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;




// //src/pages/Login.js VERSION TEST 

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [error, setError] = useState('');
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false); // État pour le message de succès
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

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
//             const response = await axios.post('http://localhost:8002/api/users/login', formData, {
//                 withCredentials: true
//             });

//             if (response.status === 200 && response.data) {
//                 console.log(response.data);
                
//                 // Mettre à jour le store Redux avec les informations de connexion
//                 dispatch(loginSuccess(response.data));

//                 // Afficher le message de succès
//                 setShowSuccessMessage(true);

//                 // Redirection basée sur le rôle de l'utilisateur
//                 if (response.data.isAdmin) {
//                     navigate('/admin'); // Redirige vers la page admin si l'utilisateur est un administrateur
//                 } else {
//                     navigate('/'); // Redirige vers la page d'accueil pour les utilisateurs simples
//                 }
//             }
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 setError(error.response.data.message || 'Email ou mot de passe incorrect');
//             } else {
//                 setError('Une erreur s\'est produite lors de la connexion');
//             }

//             dispatch(loginFailure(error.message));
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
//                     {showSuccessMessage && (
//                         <Alert variant="success" className="text-center">
//                             Félicitation, vous êtes bien identifié !
//                         </Alert>
//                     )}
//                     <h3 className="text-center">Connexion</h3>
//                     {error && <Alert variant="danger">{error}</Alert>}
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


// // src/components/Login.js code MARCHE OK!!!!!!

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [error, setError] = useState('');
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false); // État pour le message de succès
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

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
//             const response = await axios.post('http://localhost:8002/api/users/login', formData, {
//                 withCredentials: true
//             });

//             if (response.status === 200 && response.data) {
//                 console.log(response.data);
                
//                 // Mettre à jour le store Redux avec les informations de connexion
//                 dispatch(loginSuccess(response.data));

//                 // Afficher le message de succès
//                 setShowSuccessMessage(true);

//                 // Optionnel: Rediriger vers la page d'accueil après un délai
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 500);
//             }
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 setError(error.response.data.message || 'Email ou mot de passe incorrect');
//             } else {
//                 setError('Une erreur s\'est produite lors de la connexion');
//             }

//             dispatch(loginFailure(error.message));
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
//                     {showSuccessMessage && (
//                         <Alert variant="success" className="text-center">
//                             Félicitation, vous êtes bien identifié !
//                         </Alert>
//                     )}
//                     <h3 className="text-center">Connexion</h3>
//                     {error && <Alert variant="danger">{error}</Alert>}
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

                


// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

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
//             const response = await axios.post('http://localhost:8002/api/users/login', formData, {
//                 withCredentials: true
//             });

//             // Assurez-vous que la réponse contient les données nécessaires
//             if (response.status === 200 && response.data) {
                
//                 console.log(response.data)
//                 // Mettre à jour le store Redux avec les informations de connexion
//                 dispatch(loginSuccess(response.data));

//                 // Rediriger vers la page d'accueil après une connexion réussie
//                 navigate('/');
//             }
//         } catch (error) {
//             // Gérer les erreurs spécifiques en fonction des réponses du backend
//             if (error.response && error.response.data) {
//                 // Utiliser le message d'erreur spécifique envoyé par le backend, s'il existe
//                 setError(error.response.data.message || 'Email ou mot de passe incorrect');
//             } else {
//                 // Message d'erreur générique si aucun message spécifique n'est fourni
//                 setError('Une erreur s\'est produite lors de la connexion');
//             }

//             // Dispatch de l'échec de connexion avec le message d'erreur
//             dispatch(loginFailure(error.message));

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
//                     {error && <Alert variant="danger">{error}</Alert>}
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



