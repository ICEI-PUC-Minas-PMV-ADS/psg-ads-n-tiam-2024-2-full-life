// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvLjMDn7Qh5ozBXSQsnjDSIFxfiNBVWmY",
  authDomain: "fulllife-91682.firebaseapp.com",
  projectId: "fulllife-91682",
  storageBucket: "fulllife-91682.appspot.com",
  messagingSenderId: "222656162628",
  appId: "1:222656162628:web:9b2439f2014aeed5450511",
  measurementId: "G-7VMTCHRWME"
};

// Initialize Firebase
if(!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig)
}
const analytics = getAnalytics(app);

export default firebase;