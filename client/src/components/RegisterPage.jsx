import { useState } from "react";
import { register } from "../helpers/authService";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores anteriores

        // Validaciones personalizadas
        if (username.length < 4 || username.length > 12) {
            setError('Username must be between 4 and 12 characters.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be between 8 and 16 characters and include at least one number, one uppercase and one lowercase letter.');
            return;
        }

        try {
            await register(username, email, password);
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : "An error occurred during registration";
            setError(errorMessage);
        }
    };

    return (
        <div className="container py-3">
            <div className="card mx-auto rounded-5 shadow-lg" style={{ maxWidth: "400px" }}>
                <div className="card-header bg-dark rounded-top-4 rounded-bottom-5 text-light text-center">
                    <h3>Register</h3>
                    <p className="mb-1">To share your knowledge!</p>
                </div>
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {typeof error === 'string' ? error : JSON.stringify(error)}
                        </div>
                    )}
                    <form className="contact-form" onSubmit={handleRegister}>
                        <div className="form-group mt-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" value={username} className="form-control" onChange={e => { setUsername(e.target.value); setError(''); }} required/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" value={email} className="form-control" onChange={e => { setEmail(e.target.value); setError(''); }} required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" value={password} id="password" className="form-control" onChange={e => { setPassword(e.target.value); setError(''); }} required/>
                        </div>
                        <hr />
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-outline-primary btn-block form-control">Register</button>
                        </div>
                        <div className="form-group mt-2">
                            <Link className="btn btn-outline-success btn-block form-control" to="/login">Login</Link><br />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
