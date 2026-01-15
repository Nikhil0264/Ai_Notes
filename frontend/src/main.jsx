import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotesList from './pages/NotesList.jsx'
import Layout from './Layout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Register from './pages/Register.jsx'
import HomePage from './pages/HomePage.jsx'
import Pdf from './components/Pdf.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index: true, 
        element: <HomePage />
      },
      {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/dashboard',
          element:<Dashboard/>
        },
        {
          path:'/admin',
          element:<AdminDashboard/>
        },
        {
          path:'/allNotes',
          element:<NotesList/>,
          children:[
            {
              path:":id/chat",
              element:<Pdf/>
            },
          ]
        }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
