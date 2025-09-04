import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto' }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <button disabled={loading} type="submit">Login</button>
      </form>
      <button style={{ marginTop: 8 }} onClick={loginWithGoogle}>Login with Google</button>
      <p style={{ marginTop: 12 }}>
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
