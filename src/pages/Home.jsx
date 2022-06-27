import React from 'react'
import ExerciseTile from '../components/ExerciseTile.jsx'
import style from './Styles/HomeStyle.module.css'
import { Link } from 'react-router-dom'

function Home() {

   const EXERCISES = [
      {
         id: "1",
         shortTitle: "jumpingJack",
         title: "Jumping Jack",
         imgSrc: "/assets/images_gif/jumping_jack.gif"
      },

      {
         id: "2",
         shortTitle: "legRaises",
         title: "Leg Raises",
         imgSrc: "/assets/images_gif/leg_raises.gif"
      },

      {
         id: "3",
         shortTitle: "pushUp",
         title: "Push Up",
         imgSrc: "/assets/images_gif/push_up.gif"
      },

      {
         id: "4",
         shortTitle: "sitUp",
         title: "Sit Up",
         imgSrc: "/assets/images_gif/sit_up.gif"
      },

      {
         id: "5",
         shortTitle: "squat",
         title: "Squats",
         imgSrc: "/assets/images_gif/squat.gif"
      },
   ]

   return (

      <div className={style.home}>
         <div className={style.tilesContainer}>
            {
               EXERCISES.map((item) => (
                  <ExerciseTile
                     shortTitle={item.shortTitle}
                     key={item.id}
                     title={item.title}
                     image={item.imgSrc}
                  />
               ))}
         </div>

         <div>
            <h1>Made by Neil Cayton</h1>
         </div>
      </div>
   )
}

export default Home