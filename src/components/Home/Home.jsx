import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Menu from '../Menu/Menu'
import Process from '../Process/Process'
import Footer from '../Footer/Footer'
import Contact from '../Contact/Contact'

const Home = () => {
  return (
    <div>
      <Hero />
      <Menu />
      <Process />
      <Contact />
    </div>
  )
}

export default Home