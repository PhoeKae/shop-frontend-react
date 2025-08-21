import React from 'react'
import Logo from '../../assets/logo.png'
import Button from '../Button/Button'
import { motion } from "framer-motion"
import { FadeRight } from '../../utility/animation'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 flex md:flex-row flex-col items-center md:pt-30 pt-35 bg-yellow-950 min-h-screen">
        {/* Hero Content */}
        <div className="flex-1">
          <motion.h1 variants={FadeRight(0.5)} initial="hidden" animate="visible" className='md:text-7xl/20 text-5xl/14 font-bold mt-4 text-white'>Welcome to <br /><span className='text-amber-500'>Sein</span> Gyi</motion.h1>
          <motion.p variants={FadeRight(1)} initial="hidden" animate="visible" className='text-zinc-400 md:text-lg text-md max-w-[530px] mt-5 mb-10'>
            <span className='md:text-5xl/20 text-3xl/20 font-bold mt-4 text-white'>မင်္ဂလာပါ။</span> <br /> <span className='md:text-5xl/20 text-3xl/14 font-bold mt-4 text-white'> ရွှင်လန်းချမ်းမြေ့ကြပါစေ။</span>

          </motion.p>
          <motion.div variants={FadeRight(1.5)} initial="hidden" animate="visible">
            <Link to="/menu-page" className='bg-gradient-to-b from-orange-400 to-orange-500 text-white px-5 py-2 rounded-lg md:text-lg text-md hover:scale-105 hover:to-amber-500 transition-all duration-300 cursor-pointer'>View Menu</Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <motion.img
            initial={{ opacity: 0, x: 200, rotate: 75 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            src={Logo} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Hero