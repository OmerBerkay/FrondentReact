import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password
      });

      const responseData = response.data;
      console.log(responseData);

      setMessage('Giriş başarılı.');

      // ID'yi ayrıştırıp kaydediyoruz
      localStorage.setItem('user', JSON.stringify({ email: responseData.email, id: responseData.id }));

      onLoginSuccess();
      navigate('/'); // Ana sayfaya yönlendirir

    } catch (error) {
      setMessage('Giriş sırasında bir hata oluştu.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Kaydolma sayfasına yönlendirir
  };

  return (
    <div>
      <h2>Giriş</h2>
      <div>
        <label htmlFor="login-email">E-posta:</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="login-password">Şifre:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Giriş Yap</button>
      <button onClick={handleSignupRedirect}>Kaydol</button>
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  );
}

export default Login;
