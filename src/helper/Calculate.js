import * as pose from "@mediapipe/pose"

const calculatePoseAngle = (a, b, c) => {
   let radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
   let angle = Math.abs(radians * (180 / Math.PI))
   if (angle > 180) {
      angle = 360 - angle
   }
   return angle.toFixed(2)
}

export function getCalculatedAngles(results) {
   const landmarks = results.poseLandmarks

   // console.log(`Results.poseLandmarks: ${JSON.stringify(results.poseLandmarks)}`);

   // LEFT_PORTION_HIGHER
   let leftShoulder = landmarks[pose.POSE_LANDMARKS.LEFT_SHOULDER];
   let leftElbow = landmarks[pose.POSE_LANDMARKS.LEFT_ELBOW];
   let leftWrist = landmarks[pose.POSE_LANDMARKS.LEFT_WRIST];

   //LEFT_PORTION_LOWER
   let leftHip = landmarks[pose.POSE_LANDMARKS.LEFT_HIP]
   // console.log(`leftHip ${JSON.stringify(leftHip)}`);
   let leftKnee = landmarks[pose.POSE_LANDMARKS.LEFT_KNEE]
   // console.log(`leftKnee ${JSON.stringify(leftKnee)}`);
   let leftAnkle = landmarks[pose.POSE_LANDMARKS.LEFT_ANKLE]
   let leftFootIndex = landmarks[pose.POSE_LANDMARKS.LEFT_FOOT_INDEX]
   let leftHeel = landmarks[pose.POSE_LANDMARKS.LEFT_HEEL]
   //RIGHT_PORTION_HIGHER
   let rightShoulder = landmarks[pose.POSE_LANDMARKS.RIGHT_SHOULDER];
   let rightElbow = landmarks[pose.POSE_LANDMARKS.RIGHT_ELBOW];
   let rightWrist = landmarks[pose.POSE_LANDMARKS.RIGHT_WRIST];

   //RIGHT_PORTION_LOWER
   let rightHip = landmarks[pose.POSE_LANDMARKS.RIGHT_HIP]
   let rightKnee = landmarks[pose.POSE_LANDMARKS.RIGHT_KNEE]
   let rightAnkle = landmarks[pose.POSE_LANDMARKS.RIGHT_ANKLE]
   let rightFootIndex = landmarks[pose.POSE_LANDMARKS.RIGHT_FOOT_INDEX]
   let rightHeel = landmarks[pose.POSE_LANDMARKS.RIGHT_HEEL]

   //Calculate Angles 
   // LEFT_ANGLE_PORTION_HIGHER
   let leftElbowAngle = calculatePoseAngle(leftShoulder, leftElbow, leftWrist)
   let leftShoulderAngle = calculatePoseAngle(leftHip, leftShoulder, leftElbow)
   // LEFT_ANGLE_PORTION_LOWER
   let leftHipAngle = calculatePoseAngle(leftShoulder, leftHip, leftKnee)
   let leftKneeAngle = calculatePoseAngle(leftHip, leftKnee, leftAnkle)
   let leftFootIndexAngle = calculatePoseAngle(leftAnkle, leftFootIndex, leftHeel)

   // RIGHT_ANGLE_PORTION_HIGHER
   let rightElbowAngle = calculatePoseAngle(rightShoulder, rightElbow, rightWrist)
   let rightShoulderAngle = calculatePoseAngle(rightHip, rightShoulder, rightElbow)
   // RIGHT_ANGLE_PORTION_LOWER
   let rightHipAngle = calculatePoseAngle(rightShoulder, rightHip, rightKnee)
   let rightKneeAngle = calculatePoseAngle(rightHip, rightKnee, rightAnkle)
   let rightFootIndexAngle = calculatePoseAngle(rightAnkle, rightFootIndex, rightHeel)

   // console.log(`leftKneeAngle: ${leftKneeAngle}`);
   return { leftElbowAngle, leftShoulderAngle, leftHipAngle, leftKneeAngle, leftFootIndexAngle, rightElbowAngle, rightShoulderAngle, rightHipAngle, rightKneeAngle, rightFootIndexAngle }
}