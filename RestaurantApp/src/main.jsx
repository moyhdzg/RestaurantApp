import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Reservaciones from './components/Reservaciones'
import Menu from './components/Menu'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App /> 
  },
  {
    path:'/reservaciones',
    element: <Reservaciones />
  },
  {
    path:'/menu',
    element: <Menu />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
