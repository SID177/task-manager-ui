import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './assets/sass/style.scss';

createBrowserRouter(routes, {
  basename: "/task-manager-ui",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
