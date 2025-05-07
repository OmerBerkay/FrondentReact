import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Navi from './layouts/Navi';
import Login from './giris/Login';
import Signup from './giris/Signup';
import Dashbord from './layouts/Dashbord';
import AddBook from './pages/AddBook';
import Deletebook from './pages/Deletebook';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            
                <div className="App">
                    <Navi />
                    <Container>
                        <Routes>
                            <Route path="/" element={isLoggedIn ? <Dashbord /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/add-book" element={<AddBook />} />
                            <Route path="/delete-book" element={<Deletebook />} />
                        </Routes>
                    </Container>
                </div>
           
        </Router>
    );
}

export default App;
