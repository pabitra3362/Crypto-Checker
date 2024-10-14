import { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Final from './pages/final'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/crypto/:id' element={<Final />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
