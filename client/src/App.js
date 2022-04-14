import React from 'react';
import './App.css';
import SignUp from './pages/signUp';
import LogIn from './pages/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthDashboard from './pages/authenticationDashboard';
import Dashboard from './pages/dashboard';
import OrderPage from './pages/orderPage';
import SocketIoClient from 'socket.io-client';

function App() {
  React.useEffect(() => {
    const socket = SocketIoClient('https://logistics-tracker.herokuapp.com');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    socket.on('FromAPI', (data) => {
      console.log(data);
    });
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthDashboard />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/order/:id" element={<OrderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
