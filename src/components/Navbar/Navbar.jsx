import React, { useState } from 'react'
import { IoDiamond } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { TiMinus } from "react-icons/ti";
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <header className=' bg-yellow-950 fixed top-0 right-0 left-0'>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='max-w-[1400px] mx-auto px-10 md:h-[12vh] h-[12vh] flex justify-between items-center'>
        <Link to="/" className='text-4xl font-bold text-white'><span className='text-amber-500'>Sein</span> Gyi</Link>

        {/* Desktop Menu */}
        <ul className='md:flex items-center gap-x-15 hidden'>
          <li>
            <Link to="/" className='font-semibold tracking-wider text-white hover:text-orange-500'>Home</Link>
          </li>
          <li>
            <Link to="/menu-page" className='font-semibold tracking-wider text-white hover:text-orange-500'>Menu</Link>
          </li>
          <li>
            <Link to="/process" className='font-semibold tracking-wider text-white hover:text-orange-500'>Our Process</Link>
          </li>
          <li>
            <Link to="/contact" className='font-semibold tracking-wider text-white hover:text-orange-500'>Contact Us</Link>
          </li>
          {/* TanStack Query Demo Links */}
          <li>
            <Link to="/dashboard" className='font-semibold tracking-wider text-white hover:text-orange-500'>Dashboard</Link>
          </li>
          <li>
            <Link to="/products" className='font-semibold tracking-wider text-white hover:text-orange-500'>Products</Link>
          </li>
          <li>
            <Link to="/categories" className='font-semibold tracking-wider text-white hover:text-orange-500'>Categories</Link>
          </li>
        </ul>

        {/* Nav Action */}
        <div className="flex items-center gap-x-5">
          <a className='text-white text-3xl'>
            <IoDiamond />
          </a>
          <a className='text-white text-3xl md:hidden' onClick={toggleMenu}>
            {showMenu ? <TiMinus /> : <HiMenuAlt2 />}
          </a>
        </div>

        {/* mobile view */}
        <ul className={`flex flex-col gap-y-12 bg-orange-500/15 backdrop-blur-sm rounded-xl p-10 w-70 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ''}`}>
          <li>
            <Link to="/" className='font-semibold tracking-wider text-white hover:text-orange-500'>Home</Link>
          </li>
          <li>
            <Link to="/menu-page" className='font-semibold tracking-wider text-white hover:text-orange-500'>Menu</Link>
          </li>
          <li>
            <Link to="/process" className='font-semibold tracking-wider text-white hover:text-orange-500'>Our Process</Link>
          </li>
          <li>
            <Link to="/contact" className='font-semibold tracking-wider text-white hover:text-orange-500'>Contact Us</Link>
          </li>
          {/* TanStack Query Demo Links */}
          <li>
            <Link to="/dashboard" className='font-semibold tracking-wider text-white hover:text-orange-500'>Dashboard</Link>
          </li>
          <li>
            <Link to="/products" className='font-semibold tracking-wider text-white hover:text-orange-500'>Products</Link>
          </li>
          <li>
            <Link to="/categories" className='font-semibold tracking-wider text-white hover:text-orange-500'>Categories</Link>
          </li>
        </ul>
      </motion.nav>
    </header >
  )
}

export default Navbar