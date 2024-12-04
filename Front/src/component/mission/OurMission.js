import React from 'react'
import './mission.css'

const OurMission = () => {
  return (
    <div className='ourmission'>

      <div className="mission0">Mission and Values</div>

      <div class="line-4"></div>

      <div className="accordion">
        <div className='trah'>
          <input id="article1" type="radio" name="articles" defaultChecked />
          <article className='ar1'>
            <label className='lbl1' for="article1">
              <div className='number1'>1</div>
              <div className='ar1text'>
                Build the best product that creates the most value for our customers, use business to inspire and implement environmentally friendly solutions.
              </div>
            </label>
          </article>
        </div>


        <div>
          <input id="article2" type="radio" name="articles" />
          <article className='ar2' for="article2">
            <label className='lbl2' for="article2">
              <div className='number2'>2</div>
              <div className='ar2text'>
                We foster a culture of innovation, staying at the forefront of technology
                and business trends to provide cutting-edge solutions.
              </div>
            </label>
          </article>
        </div>


        <div>
          <input id="article3" type="radio" name="articles" />
          <article className='ar3'>
            <label className='lbl3' for="article3">
              <div className='number3'>3</div>
              <div className='ar3text'>
                We strive to go above and beyond for our clients no matter the challenge. We
                aim to deliver our very best work every single day across our services.
              </div>
            </label>
          </article>
        </div>


        <div>
          <input id="article4" type="radio" name="articles" />
          <article className='ar4'>
            <label className='lbl4' for="article4">
              <div className='number4'>4</div>
              <div className='ar4text'>
                We foster a culture of innovation, staying at the forefront of technology
                and business trends to provide cutting-edge solutions.
              </div>
            </label>
          </article>
        </div>


      </div>


    </div>
  )
}

export default OurMission
