import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './assets/sass/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="task-manager-ui">
    <App />
  </BrowserRouter>
);
