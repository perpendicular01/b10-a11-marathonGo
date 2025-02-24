import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './Contexts/AuthProvider'
import MarathonProvider from './Contexts/MarathonProvider'
import { ToastContainer } from 'react-toastify'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MarathonProvider>
        <RouterProvider router={router} />
        <ToastContainer></ToastContainer>
      </MarathonProvider>
    </AuthProvider>
  </StrictMode>,
)
