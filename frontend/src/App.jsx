import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stopwatch from './pages/Stopwatch'
import Layout from './pages/Layout'
import './App.css'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="stopwatch" element={<Stopwatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
