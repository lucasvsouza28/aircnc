import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
import Routes from './routes';

function App({ history }) {

  return (
    <div className="container">      
      <img src={logo} alt="Aircnc" onClick={e => window.location.href = '/dashboard'} />

      <div className="content">
        <Routes />        
      </div>
    </div>
  );
  
}

export default App;
