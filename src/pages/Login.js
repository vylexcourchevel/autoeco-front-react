import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Soumission du formulaire pour la connexion
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/login', formData, {
                withCredentials: true,
            });

            if (response.status === 200 && response.data) {
                dispatch(loginSuccess(response.data)); // Mise à jour du store Redux
                setShowSuccessMessage(true); // Affiche le message de succès

                // Redirection selon le rôle utilisateur
                navigate(response.data.isAdmin ? '/admin' : '/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Email ou mot de passe incorrect');
            dispatch(loginFailure(error.message));

            // Affiche l'erreur pendant 3 secondes et recharge la page
            setTimeout(() => {
                setError('');
                window.location.reload();
            }, 3000);
        }
    };

    // Réinitialisation de mot de passe
    const handleForgotPasswordSubmit = async (email) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/forgot-password', { email });
            if (response.status === 200) {
                setMessage('Un email avec les instructions a été envoyé.');
                setError('');
                // Redirige vers la page d'accueil après un délai pour afficher le message
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch {
            setError('Une erreur s\'est produite, vérifiez votre email.');
            setMessage('');
        }
    };

    // Composant pour la réinitialisation de mot de passe
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

    const containerStyle = { marginTop: '100px' };

    // Redirection si l'utilisateur est déjà connecté
    useEffect(() => {
        const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
        if (token) {
            navigate('/'); // Redirige vers la page d'accueil
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
                        <ForgotPassword /> // Affiche la page de réinitialisation de mot de passe
                    ) : (
                        <div>
                            <h3 className="text-center">Connexion</h3>
                            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
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



// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../redux/reducers/sliceAuth';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [isForgotPassword, setIsForgotPassword] = useState(false);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // Gestion des changements dans le formulaire
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Soumission du formulaire pour la connexion
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/login', formData, {
//                 withCredentials: true,
//             });

//             if (response.status === 200 && response.data) {
//                 dispatch(loginSuccess(response.data)); // Mise à jour du store Redux
//                 setShowSuccessMessage(true); // Affiche le message de succès

//                 // Redirection selon le rôle utilisateur
//                 navigate(response.data.isAdmin ? '/admin' : '/');
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'Email ou mot de passe incorrect');
//             dispatch(loginFailure(error.message));

//             // Affiche l'erreur pendant 3 secondes et recharge la page
//             setTimeout(() => {
//                 setError('');
//                 window.location.reload();
//             }, 3000);
//         }
//     };

//     // Réinitialisation de mot de passe
//     const handleForgotPasswordSubmit = async (email) => {
//         try {
//             const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/users/forgot-password', { email });
//             if (response.status === 200) {
//                 setMessage('Un email avec les instructions a été envoyé.');
//                 setError('');
//             }
//         } catch {
//             setError('Une erreur s\'est produite, vérifiez votre email.');
//             setMessage('');
//         }
//     };

//     // Composant pour la réinitialisation de mot de passe
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

//     const containerStyle = { marginTop: '100px' };

//     // Redirection si l'utilisateur est déjà connecté
//     useEffect(() => {
//         const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
//         if (token) {
//             navigate('/'); // Redirige vers la page d'accueil
//         }
//     }, [navigate]);

//     return (
//         <Container style={containerStyle}>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     {showSuccessMessage && (
//                         <Alert variant="success" className="text-center">
//                             Félicitations, vous êtes bien identifié !
//                         </Alert>
//                     )}
//                     {isForgotPassword ? (
//                         <ForgotPassword /> // Affiche la page de réinitialisation de mot de passe
//                     ) : (
//                         <div>
//                             <h3 className="text-center">Connexion</h3>
//                             {error && <Alert variant="danger" className="text-center">{error}</Alert>}
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

