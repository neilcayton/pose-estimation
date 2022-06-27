import React, { useEffect, useRef, useState } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import * as mediapipePose from "@mediapipe/pose"
import { Pose } from "@mediapipe/pose";
import Webcam from 'react-webcam'
import * as cam from "@mediapipe/camera_utils";
import { getCalculatedAngles } from '../helper/Calculate'

import style from './Styles/ExercisePageStyle.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const ExercisePage = () => {

   const location = useLocation()
   let navigate = useNavigate()
   let exerciseType = location.state.shortTitle
   let exerciseTitle = location.state.title


   const webcamRef = useRef(null);
   const canvasRef = useRef(null);
   let camera = null;
   let down;
   let stage = "return"
   let repsCounter = 0;
   const [repCounter, setRepCounter] = useState(0)



   function onResults(results) {

      try {
         selectMethod(exerciseType, results)

      } catch (error) {
         // console.error(error);
      }
      // Define the canvas element dimensions using the earlier created refs
      canvasRef.current.width = webcamRef.current.video.videoWidth
      canvasRef.current.height = webcamRef.current.video.videoHeight

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d")
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image,
         0,
         0,
         canvasElement.width,
         canvasElement.height
      )
      drawConnectors(canvasCtx,
         results.poseLandmarks, mediapipePose.POSE_CONNECTIONS,
         { color: 'white', lineWidth: 2 });
      // * The dots are the landmarks 
      drawLandmarks(canvasCtx, results.poseLandmarks,
         { color: 'blue', lineWidth: 1, radius: 3 });
      canvasCtx.restore();
   }

   const selectMethod = (exerciseType, results) => {
      let { leftElbowAngle, leftShoulderAngle, leftHipAngle, leftKneeAngle, leftFootIndexAngle, rightElbowAngle, rightShoulderAngle, rightHipAngle, rightKneeAngle, rightFootIndexAngle } = getCalculatedAngles(results)


      if (exerciseType === "jumpingJack") {
         jumpingJackCondition(leftShoulderAngle, rightShoulderAngle, leftHipAngle, rightHipAngle)
      }
      if (exerciseType === "legRaises") {
         legRaisesCondition(leftKneeAngle, rightKneeAngle, leftElbowAngle,
            rightElbowAngle, leftHipAngle, rightHipAngle, leftShoulderAngle,
            rightShoulderAngle)
      }
      if (exerciseType === "pushUp") {
         pushUpCondition(leftElbowAngle, rightElbowAngle, leftShoulderAngle, rightShoulderAngle)
      }
      if (exerciseType === "sitUp") {
         situpCondition(leftKneeAngle, leftElbowAngle, leftHipAngle)
      }
      if (exerciseType === "squat") {
         squatCondition(leftShoulderAngle, leftHipAngle, leftElbowAngle, leftKneeAngle)
      }
   }

   //Conditions
   const jumpingJackCondition = (leftShoulderAngle, rightShoulderAngle, leftHipAngle, rightHipAngle) => {

      if (leftShoulderAngle < 50 && rightShoulderAngle < 50 && leftHipAngle > 174 && rightHipAngle > 174) {
         stage = true
      }

      if (leftShoulderAngle > 120 && rightShoulderAngle > 120 && leftHipAngle < 174 && rightHipAngle < 174 && stage) {
         stage = false
         repsCounter += 1
         setRepCounter(repsCounter)
         console.log(`stage: ${stage} | reps: ${repsCounter}`);
      }

   }

   const legRaisesCondition = (leftKneeAngle, rightKneeAngle, leftElbowAngle,
      rightElbowAngle, leftHipAngle, rightHipAngle, leftShoulderAngle,
      rightShoulderAngle) => {

      if (leftHipAngle > 160 || rightHipAngle > 160) {
         stage = true
      }
      if ((leftHipAngle < 140 || rightHipAngle < 140) && stage) {
         stage = false
         repsCounter += 1
         setRepCounter(repsCounter)
         console.log(`stage: ${stage} | reps: ${repsCounter}`);
      }
   }

   const pushUpCondition = (leftElbowAngle, rightElbowAngle, leftShoulderAngle, rightShoulderAngle) => {
      if ((leftElbowAngle > 120 || rightElbowAngle > 120) && (leftShoulderAngle > 50 || rightShoulderAngle > 50)) {
         stage = true
      }
      if ((leftElbowAngle < 100 || rightElbowAngle < 100) && (leftShoulderAngle < 50 || rightShoulderAngle < 50) && stage) {
         stage = false
         repsCounter += 1
         setRepCounter(repsCounter)
         console.log(`stage: ${stage} | reps: ${repsCounter}`);
      }
   };


   const situpCondition = (leftKneeAngle, leftElbowAngle, leftHipAngle) => {

      if (leftKneeAngle < 60) {
         if (leftHipAngle > 90) {
            stage = true
         }
         if (leftHipAngle < 60 && stage) {
            stage = false
            repsCounter += 1;
            setRepCounter(repsCounter);
            console.log(`stage: ${stage} | reps: ${repsCounter}`);
         }
      }
   }

   const squatCondition = (leftShoulderAngle, leftHipAngle, leftElbowAngle, leftKneeAngle) => {
      // console.log(leftShoulderAngle, leftHipAngle, leftElbowAngle);
      if (leftHipAngle > 160) {
         stage = true
      }
      if (leftHipAngle < 150 && leftShoulderAngle > 30 && leftKneeAngle < 125 && stage) {
         stage = false
         repsCounter += 1
         setRepCounter(repsCounter)
         console.log(`stage: ${stage} | reps: ${repsCounter}`);
      }
   }

   const { widthVal, heightVal } = [600, 600]




   useEffect(() => {
      const userPose = new Pose({
         locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
         },
      });
      userPose.setOptions({
         selfieMode: true,
         modelComplexity: 0,
         smoothLandmarks: true,
         enableSegmentation: false,
         smoothSegmentation: true,
         minDetectionConfidence: 0.5,
         minTrackingConfidence: 0.5,
      });
      userPose.onResults(onResults);
      if (
         typeof webcamRef.current !== "undefined" &&
         webcamRef.current !== null
      ) {
         camera = new cam.Camera(webcamRef.current.video, { // no issues with the exaustive-deps. We do not need to store the camera object for current purposes
            onFrame: async () => {
               await userPose.send({ image: webcamRef.current.video });
            },
            width: { widthVal },
            height: { heightVal },
         });
         camera.start();
      }
   }, []);

   const navigateToHome = () => {
      navigate('/')

   }


   return (<div>
      <div className={style.mainContainer}>

         <div className={style.topContainer}>
            {
               repCounter >= 20 ?
                  <div className={style.modalContainer} >
                     <section className={style.modal}>
                        <p>
                           Congratulations you finished 20 repetitions!
                        </p>
                        <button className={style.okButton} onClick={
                           () => navigateToHome()
                        }>ok</button>
                     </section>
                  </div> : ''

            }
            <Webcam
               ref={webcamRef}
               style={style.cameraContainer}
               style={{
                  flexGrow: 1,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  width: { widthVal },
                  height: { heightVal },
                  display: 'none'
               }}
            />
            <canvas
               ref={canvasRef}
               style={{
                  flexGrow: 1,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  width: { widthVal },
                  height: { heightVal },
                  // display: 'none'
               }}

            ></canvas>
         </div>
         <div className={style.bottomContainer}>
            <div className={style.textFormat2}>{exerciseTitle}</div>
            <div className={style.goButton}> {repCounter}/20 </div>
         </div>
      </div>
   </div>
   )
}

export default ExercisePage