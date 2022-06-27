import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import style from './styles/PageGoStyle.module.css'
import pushUp from '../assets/images_gif/push_up.gif'

export default function  PageGo() {
  return (
    <div className={style.mainContainer}>
      <div className={style.topContainer}>
        <div className={style.textContainer}>
          <div className={style.textFormat}>Please Follow the Pose from the Image</div>
        </div>
        <div className={style.imgContainer}>
          <img className={style.imageStyle} src={pushUp} alt="None" />
        </div> 
      </div>
      <div className={style.bottomContainer}>
        <button className={style.goButton}>GO!</button>
      </div>
    </div>
  )
}
