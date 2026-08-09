import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isSignUp) {
                await signup(email, password, username);
            } else {
                await login(email, password);
            }
            navigate("/explore");
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">{isSignUp ? "Sign Up" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                {isSignUp && (
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">
                    {isSignUp ? "Sign Up" : "Login"}
                </button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)} className="switch-button">
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}

export default Login;