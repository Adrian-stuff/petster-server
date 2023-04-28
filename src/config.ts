// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr4941UUSLot5FnLG0JH5BTggACtzjAGY",
  authDomain: "ig-clone-ae3bf.firebaseapp.com",
  databaseURL: "https://ig-clone-ae3bf-default-rtdb.firebaseio.com",
  projectId: "ig-clone-ae3bf",
  storageBucket: "ig-clone-ae3bf.appspot.com",
  messagingSenderId: "359507694327",
  appId: "1:359507694327:web:26608dee453d7da1a479f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app as firebaseApp };
