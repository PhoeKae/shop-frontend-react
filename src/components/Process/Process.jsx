import React from 'react'
import Heading from '../Heading/Heading'
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled, TbCircleNumber4Filled } from "react-icons/tb";
import { FaBowlRice, FaBottleWater } from "react-icons/fa6";
import { MdGppGood, MdRoomService } from "react-icons/md";




const Process = () => {

  const renderSteps = steps.map(item => {
    return (
      <div className={`flex-1 basis-[300px] ${item.id % 2 === 0 ? 'md:-mt-100' : ''}`}>
        <span className='flex justify-center items-center w-18 h-18 mx-auto  rounded-full text-8xl bg-zinc-800 text-white outline-[3px] outline-offset-7 outline-zinc-800 outline-dashed'>{item.number}</span>

        <div className='flex items-center gap-x-5 mt-10'>
          <span className='flex justify-center items-center text-3xl bg-gradient-to-b from-orange-400 to-orange-500 text-white w-15 h-15 rounded-full'>{item.icon}</span>

          <div className='flex-1'>
            <h4 className='text-zinc-800 text-2xl font-bold'>{item.title}</h4>
            <p className='text-zinc-600 mt-2'>{item.para}</p>
          </div>
        </div>
      </div>
    )
  });


  return (
    <section>
      <div className='max-w-[1400px] mx-auto px-10 py-20'>
        <div className='w-fit mr-auto'>
          <Heading highlight="Our" heading="Process" />
        </div>

        <div className='flex flex-wrap gap-y-17 items-center justify-center md:mt-20 mt-10 md:pt-40'>
          {renderSteps}
        </div>
      </div>
    </section>
  )
}

export default Process

const steps = [
  {
    id: 1,
    number: <TbCircleNumber1Filled />,
    title: "Best Rice",
    para: "Our shop uses only good quality rice.",
    icon: <FaBowlRice />,
  },
  {
    id: 2,
    number: <TbCircleNumber2Filled />,
    title: "Best Oil",
    para: "Our shop uses only good quality oil.",
    icon: <FaBottleWater />,
  },
  {
    id: 3,
    number: <TbCircleNumber3Filled />,
    title: "Best Quality",
    para: "Our shop uses only the best quality products.",
    icon: <MdGppGood />,
  },
  {
    id: 4,
    number: <TbCircleNumber4Filled />,
    title: "Best Service",
    para: "Our shop provides the best service.",
    icon: <MdRoomService />,
  },
]