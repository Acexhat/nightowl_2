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
import { useDispatch } from 'react-redux';
import { setOrdersByShipments, updateLocations, updateShipments } from './store/Actions/actions';
import { API_PREFIX } from './utils/Constants';
import axios from 'axios';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    const socket = SocketIoClient('https://logistics-tracker.herokuapp.com');
    // const socket = SocketIoClient('http://localhost:5000');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    socket.on('FromAPI', (data) => {
      let toSetData = data?.map(item => item.data);
      console.log('shipments', toSetData);
      dispatch(updateShipments(toSetData));
    });
    socket.on('FromLocations', (data) => {
      let toSetData = data?.map(item => item.data);
      dispatch(updateLocations(toSetData));
    });

    const getOrdersByShipment = () => {
      let reqOptions = {
        url: `${API_PREFIX}api/ship/getAllOrdersById`,
        method: "get",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ship_token')}`,
          'Content-Type': 'application/json'
        },
      }
      axios(reqOptions).then(function (response) {
        dispatch(setOrdersByShipments(response.data));
      }).catch((err) => {
        console.log(err);
      })
    }
    getOrdersByShipment();
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
