import React from 'react'
import './Pluses.css'
import yoga from '../../Assets/logosIcons/yoga_2.png'

const Pluses = () => {
  return (
    <div className='pluses'>
        <div className='pluses-left'>
          <img src={yoga} alt='yoga' />
        </div>

        <div className='pluses-right'>
            <h2>BENEFITS OF PRACTICING YOGA</h2>
            <div className='txt'>
            <ol>
                    <li>Improved Flexibility and Strength: Yoga poses, or asanas, help stretch and tone muscles, increasing flexibility and strength throughout the body.</li>
                    <li>Stress Relief: The combination of breathing techniques and meditation in yoga can reduce stress and anxiety, promoting relaxation and inner peace.</li>
                    <li>Better Posture: By focusing on alignment and balance, yoga can help correct poor posture and prevent future issues.</li>
                    <li>Enhanced Focus and Concentration: The mindful nature of yoga encourages presence and awareness, leading to improved focus and concentration.</li>
                    <li>Boosted Energy Levels: Yoga's gentle movements and breathing exercises can boost energy and vitality.</li>
                </ol>
            </div>
        </div>
      
    </div>
  )
}

export default Pluses
