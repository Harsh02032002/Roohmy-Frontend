import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJson } from '../../utils/api';

const ManagerLogin = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem('manager_user') ||
        localStorage.getItem('managerData') ||
        localStorage.getItem('user') ||
        sessionStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      const role = String(parsed?.role || '').toLowerCase();

      if (role && role !== 'manager') {
        sessionStorage.removeItem('manager_user');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('managerToken');
        localStorage.removeItem('staff_user');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('staff_token');
        localStorage.removeItem('managerToken');
        localStorage.removeItem('managerData');
      }
    } catch (_) {
      // ignore storage parsing issues
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetchJson('/api/property-managers/login', {
        method: 'POST',
        body: JSON.stringify({
          loginId,
          password
        })
      });

      if (response.success) {
        const managerUser = { 
          ...response.manager, 
          role: 'manager',
          managerLoginId: response.manager.loginId,
          loginId: response.manager.ownerLoginId // Masquerade as owner so getOwnerRuntimeSession passes
        };
        sessionStorage.setItem('owner_session', JSON.stringify(managerUser));
        sessionStorage.setItem('owner_user', JSON.stringify(managerUser));
        sessionStorage.setItem('manager_user', JSON.stringify(managerUser));
        sessionStorage.setItem('user', JSON.stringify(managerUser));
        sessionStorage.setItem('token', response.token);
        
        localStorage.setItem('owner_session', JSON.stringify(managerUser));
        localStorage.setItem('owner_user', JSON.stringify(managerUser));
        localStorage.setItem('managerData', JSON.stringify(managerUser));
        localStorage.setItem('user', JSON.stringify(managerUser));
        localStorage.setItem('token', response.token);
        navigate('/propertyowner/admin');
      }
    } catch (err) {
      let message = 'Login failed. Please try again.';
      try {
        const parsed = JSON.parse(err?.body || '{}');
        message = parsed?.message || err?.message || message;
      } catch (_) {
        message = err?.message || message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxWidth: '450px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="/logo.jpg" alt="RoomHy" style={{ height: '60px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px' }}>Property Manager Login</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Manager ID</label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="MGR1234"
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#991b1b', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          <p>Need help? Contact your property owner</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;
