import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Clients from './pages/admin/clients/Clients'
import Gifts from './pages/admin/gifts/Gifts'
import Codes from './pages/admin/codes/Codes'
import Admin from './pages/admin/Admin'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Auth from './pages/auth/Auth'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      {/* <Routes>
      <Route path='/login' element={<Login />} />

      <Route path='/' element={<Auth />}>
        <Route path='admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='clients' element={<Clients />} />
          <Route path='gifts' element={<Gifts />} />
          <Route path='codes' element={<Codes />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Route>

    </Routes> */}
      <Routes>

        <Route
          path="/"
          element={
            localStorage.getItem("x-auth-token") && localStorage.getItem("bot-base-url")
              ? <Navigate to="/admin/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Auth />}>
          <Route path='admin' element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='clients' element={<Clients />} />
            <Route path='gifts' element={<Gifts />} />
            <Route path='codes' element={<Codes />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>

      </Routes>


      <ToastContainer />
    </>
  )
}

export default App


