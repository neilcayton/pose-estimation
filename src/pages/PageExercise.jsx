import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
import style from './styles/PageExerciseStyle.module.css'

export default function  PageCameraview() {
    return (
        <div className={style.mainContainer}>
            <div className={style.topContainer}>
                <div className={style.cameraContainer}>
                    <div className={style.textFormat}>Exercise Starts in 10 seconds..
                    </div>
                </div>
            </div>
            <div className={style.bottomContainer}>
            <div className={style.textFormat2}>Push-Up Exercise</div>
                <button className={style.goButton}> 5/20 </button>
            </div>
        </div>
    )
}