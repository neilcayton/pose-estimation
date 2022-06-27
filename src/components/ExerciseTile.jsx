import React from 'react'
import style from './Styles/ExerciseTileStyle.module.css'
import { useNavigate } from 'react-router-dom'


const ExerciseTile = ({ shortTitle, title, image }) => {

   let navigate = useNavigate()
   const toOtherExercisePage = () => {
      navigate(`/${shortTitle}`, { state: { shortTitle: shortTitle, title: title } })
   }
   return (
      <div className={style.mainContainer} onClick={() => {
         toOtherExercisePage()
      }}>
         {
            title !== "Push Up" ?
               <img className={style.img}
                  src={window.location.origin + image} alt="title" />
               :
               <img className={style.pushUp}
                  src={window.location.origin + image} alt="title" />
         }
         <p>{title}</p>
      </div>
   )
}

export default ExerciseTile