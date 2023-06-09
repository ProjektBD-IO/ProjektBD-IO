import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
window.API_URL = "http://localhost:8889";
window.API_URL2 = "http://localhost:3000";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    
    <App />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

