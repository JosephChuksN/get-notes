import React, { useEffect } from 'react'
import ProcedureCard from './ProcedureCard'
import { data } from "./procedures"
import { BsChevronDoubleRight, BsChevronDoubleDown } from "react-icons/bs"

// AOS import
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

export default function HowTo() {

  useEffect(() => {
    AOS.init({delay: 300})
  }, [])

  // mapping through data to create procedure cards 
    const cards = data.map((item, index) => {
        return <div data-aos="zoom-in-up">
                  <ProcedureCard 
                    key={index}
                    position={`0${index+1}`}
                    title={item.title}
                    detail={item.detail}
                    className={`card${index}`}
                  />
                </div>
    })


  return (
    <div className='how--to' id='howTo' data-aos="fade-in-up">
        {cards}
    </div>
  )
}
