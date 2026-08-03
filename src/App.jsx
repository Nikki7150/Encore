import { useState } from 'react'
import Explore from './pages/Explore'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  )
}

export default App
