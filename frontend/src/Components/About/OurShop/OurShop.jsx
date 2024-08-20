import React from 'react'
import './OurShop.css'
import meditation from '../../Assets/logosIcons/meditation.png'

const OurShop = () => {
  return (
    <div className='shop'>
        <div className='shop-left'>
            <h2>SINCE 2017: PASSIONATE ABOUT YOGA</h2>
            <div>
                <p>
                Our store has been serving the yoga community since 2017, born from a deep love for yoga and a commitment to quality. We understand the profound impact that yoga can have on one's physical and mental well-being, and that's why we carefully curate a range of high-quality yoga equipment designed to elevate your practice.
                <br/><br/>Our products are thoughtfully selected to provide comfort, durability, and style, making your yoga journey more enjoyable and fulfilling. Whether you're a seasoned yogi or just starting your practice, you'll find everything you need to support your path to wellness.
                <br/><br/>Explore our collection and discover the perfect gear for your practice. Let us be a part of your yoga journey, as you cultivate strength, flexibility, and peace of mind.
                </p>
            </div>
        </div>

        <div className='shop-right'>
            <img src={meditation} alt='meditation' />
        </div>
      
    </div>
  )
}

export default OurShop
