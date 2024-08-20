import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Add state variables for login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Add validation error state
    const [signUpError, setSignUpError] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUp(true);
        setSignUpError(""); // Clear errors on switch
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
        setLoginError(""); // Clear errors on switch
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        // Basic validation
        if (!name || !email || !password) {
            setSignUpError("All fields are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setSignUpError("Invalid email format.");
            return;
        }
          
       
        
        if (password.length < 6) {
            setSignUpError("Password must be at least 6 characters long.");
            return;
        }

        try {
            
            await axios.post("http://localhost:8080/user/signup", {
                name,
                email,
                password

            });
            alert("Sign up successful");
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            setSignUpError("Error signing up. Please try again.");
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (!loginEmail || !loginPassword) {
            setLoginError("All fields are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(loginEmail)) {
            setLoginError("Invalid email format.");
            return;
        }
        if (loginPassword.length < 6) {
            setLoginError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email: loginEmail,
                password: loginPassword
            });
            localStorage.setItem('token', response.data.token); // Store JWT token
            alert("Login successful");
            setLoginEmail("");
            setLoginPassword("");
            navigate("/home");
        } catch (error) {
            setLoginError("Error logging in. Please check your credentials.");
        }
    };

    return (
        <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    {signUpError && <p className="error">{signUpError}</p>}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleLoginSubmit}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    {loginError && <p className="error">{loginError}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {/* <a href="#">Forgot your password?</a> */}
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
