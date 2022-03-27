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

function App() {
  React.useEffect(() => {
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthDashboard />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
