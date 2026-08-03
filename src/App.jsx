import { useState } from 'react'
import Explore from './pages/Explore'
import Login from './pages/Login'
import EventDetails from './pages/EventDetails'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
    </Routes>
  )
}

export default App
