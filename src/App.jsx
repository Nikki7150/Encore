import { useState } from 'react'
import Explore from './pages/Explore'
import Login from './pages/Login'
import EventDetails from './pages/EventDetails'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MyEvents from './pages/MyEvents'

function App() {
  return (
    <div className="App" style={{ paddingLeft: '70px' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </div>
  )
}

export default App
