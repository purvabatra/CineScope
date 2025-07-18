import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Remove the BrowserRouter import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Remove BrowserRouter wrapper */}
  </React.StrictMode>
);