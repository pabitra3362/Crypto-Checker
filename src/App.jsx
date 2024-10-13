import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Final from './pages/final'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto/:id" element={<Final/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App
