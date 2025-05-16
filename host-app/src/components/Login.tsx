import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../utils/mockUsers';
import './Login.scss';

const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = e.currentTarget.username.value.trim();
        const password = e.currentTarget.password.value.trim();

        const newErrors: { username?: string; password?: string } = {};
        if (!username) {
            newErrors.username = 'Username is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const user = mockUsers.find(u => u.username === username && u.password === password);
        if (user) {
            const token = btoa(JSON.stringify({ username: user.username, role: user.role }));
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(user);
            navigate('/users');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h3>Login</h3>
                    <input
                        name="username"
                        placeholder="Username"
                        style={errors.username ? { borderColor: 'red' } : {}}
                    />
                    {errors.username && <div style={{ color: 'red', fontSize: '0.8em', textAlign: 'left' }}>{errors.username}</div>}
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        style={errors.password ? { borderColor: 'red' } : {}}
                    />
                    {errors.password && <div style={{ color: 'red', fontSize: '0.8em', textAlign: 'left' }}>{errors.password}</div>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;