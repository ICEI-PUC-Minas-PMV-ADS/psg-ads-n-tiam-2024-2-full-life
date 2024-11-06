import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvLjMDn7Qh5ozBXSQsnjDSIFxfiNBVWmY",  
    authDomain: "fulllife-91682.firebaseapp.com", 
    databaseURL: "https://fulllife-91682-default-rtdb.firebaseio.com", 
    projectId: "fulllife-91682",  
    storageBucket: "fulllife-91682.firebasestorage.app",  
    messagingSenderId: "222656162628",
    appId: "1:222656162628:web:9b2439f2014aeed5450511",
    measurementId: "G-7VMTCHRWME"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
