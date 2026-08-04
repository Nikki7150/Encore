import { useState } from 'react'
import Explore from './pages/Explore'
import Login from './pages/Login'
import EventDetails from './pages/EventDetails'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App" style={{ paddingLeft: '70px' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </div>
  )
}

export default App
