import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (email && password) {
            const user = { email, password };
            const response = await axios.post("http://localhost:8080/users/register", {
          ...user
            });

            localStorage.setItem('user', JSON.stringify({id:response.data.id,email:response.data.email}));
            navigate('/')
            setMessage('Kayıt başarılı! Giriş sayfasına gidiyorsunuz');
        } else {
            setMessage('E-posta ve şifre alanları boş olamaz.');
        }
    };

    return (
        <div style={{ width: '1000px', margin: 'auto' }}>
            <h2>Kaydol</h2>
            <Form>
                <Form.Field>
                    <label htmlFor="signup-email">E-posta:</label>
                    <input
                        type="email"
                        id="signup-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresinizi girin"
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="signup-password">Şifre:</label>
                    <input
                        type="password"
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Şifrenizi girin"
                    />
                </Form.Field>
                <Button onClick={handleSignup} primary>Kayıt Ol</Button>
            </Form>
            {message && <Message positive>{message}</Message>}
        </div>
    );
}

export default Signup;
