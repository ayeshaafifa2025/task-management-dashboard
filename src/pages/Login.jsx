import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('user1@example.com');
    const [password, setPassword] = useState('password123');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch('https://task-api-eight-flax.vercel.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                setError(data.message || "Login failed. Please check credentials.");
            }
        } catch (err) {
            setError("Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-green-100">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Task Manager Login</h2>
                    
                    {error && <div className="alert alert-error text-xs p-2">{error}</div>}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input 
                            type="email" 
                            className="input input-bordered focus:border-green-500" 
                            placeholder='write your email'
                            // defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-control mt-2">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="input input-bordered focus:border-green-500 w-full pr-10" 
                                placeholder='write your password'
                                // defaultValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-success text-white ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;