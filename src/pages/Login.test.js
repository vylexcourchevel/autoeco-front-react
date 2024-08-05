// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
    test('renders the login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Vérifie que les champs de formulaire et le bouton sont rendus
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
    });

    test('updates form fields on change', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Sélectionne les champs du formulaire
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);

        // Simule la saisie de l'utilisateur
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        // Vérifie que les champs contiennent les valeurs saisies
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password');
    });

    test('submits the form and handles success', async () => {
        axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Sélectionne les champs du formulaire
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /connexion/i });

        // Simule la saisie de l'utilisateur
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        // Simule la soumission du formulaire
        fireEvent.click(submitButton);

        // Vérifie que la requête axios a été appelée avec les bonnes données
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8002/api/users/login', {
            email: 'test@example.com',
            password: 'password'
        });
    });

    test('handles login error', async () => {
        axios.post.mockRejectedValue(new Error('Login error'));

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Sélectionne les champs du formulaire
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);
        const submitButton = screen.getByRole('button', { name: /connexion/i });

        // Simule la saisie de l'utilisateur
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        // Simule la soumission du formulaire
        fireEvent.click(submitButton);

        // Vérifie que l'erreur de connexion est affichée dans la console
        await screen.findByText(/login error/i);
    });
});
