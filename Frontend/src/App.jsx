// Import necessary dependencies
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
// Import all page components
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import Ratings from './pages/Ratings'
import Payments from './pages/Payments'
import RideHistory from './pages/RideHistory'
import SuccessPage from './pages/SuccessPage';
import CaptainRideHistory from './pages/CaptainRideHistory'
import CaptainPaymentHistory from './pages/CaptainPaymentHistory'

// Import icon library and metrics tracking hook
import 'remixicon/fonts/remixicon.css'
import useMetricsTracker from './hooks/useMetricsTracker'

// Main App component that defines all routes
const App = () => {
  // Initialize metrics tracking
  useMetricsTracker();
  
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/ride-history" element={<RideHistory />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/captain-ride-history' element={<CaptainRideHistory />} />
        <Route path='/captain-payment-history' element={<CaptainPaymentHistory />} />

        {/* User authentication routes */}
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        
        {/* Protected user routes */}
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
          
        {/* Protected captain routes */}
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App