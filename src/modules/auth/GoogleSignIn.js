import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB43i_DyM_smsC0N5Njlxs4AEHr5vxxaSg",
    authDomain: "testlogin-406502.firebaseapp.com",
    projectId: "testlogin-406502",
    storageBucket: "testlogin-406502.appspot.com",
    messagingSenderId: "705986046651",
    appId: "1:705986046651:web:755affd3271b2492ffd79e",
    measurementId: "G-LF7BXVYHLF"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};