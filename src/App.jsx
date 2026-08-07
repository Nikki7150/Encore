import { useState } from 'react'
import Explore from './pages/Explore'
import Login from './pages/Login'
import EventDetails from './pages/EventDetails'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MyEvents from './pages/MyEvents'
import Following from './pages/Following'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="App" style={{ paddingLeft: '70px' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/following" element={<Following />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
