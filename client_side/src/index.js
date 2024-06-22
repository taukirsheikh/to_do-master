import react from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App"
// importing css stylesheet to use the bootstrap class
 import 'bootstrap/dist/css/bootstrap.min.css'; //add this line only in this file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)