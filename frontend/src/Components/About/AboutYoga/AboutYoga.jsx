import React from 'react'
import './AboutYoga.css'
import yoga from '../../Assets/logosIcons/yoga.png'

const AboutYoga = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <h2>ABOUT YOGA</h2>
            <div>
              <p>Yoga is an ancient practice that originated in India thousands of years ago. It combines physical postures, breathing exercises, meditation, and ethical principles to promote overall well-being and balance in life. The physical postures, known as asanas, enhance flexibility, strength, and balance. Popular poses like Downward-Facing Dog and Tree Pose offer specific benefits for the body and mind. Additionally, breathing exercises (pranayama) and meditation help reduce stress and improve mental clarity. By integrating these elements, yoga fosters a harmonious and balanced lifestyle, promoting physical health and inner peace.</p>
            </div>
        </div>

        <div className='about-right'>
            <img src={yoga} alt='yoga' />
        </div>
    </div>
  )
}

export default AboutYoga
