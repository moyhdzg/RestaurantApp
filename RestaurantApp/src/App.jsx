import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Jumbotron from './components/Jumbotron'


function App() {
  
  return (
    <div className="App">
      <Header />
      <Jumbotron />
      <Footer />
    </div>
    
  )
}

export default App
