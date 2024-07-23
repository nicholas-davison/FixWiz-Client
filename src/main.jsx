import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApplicationViews } from './components/ApplicationViews'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApplicationViews />
  </React.StrictMode>
)
