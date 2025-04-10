// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// apiKey is not super secret in firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsHr2kF6oqQJDvSYrySjJ4o-TIOIUbjO4",
  authDomain: "lappegrenser.firebaseapp.com",
  projectId: "lappegrenser",
  storageBucket: "lappegrenser.appspot.com",
  messagingSenderId: "970885673473",
  appId: "1:970885673473:web:5419a323feaa672019c600",
  measurementId: "G-ET2HV8HVCC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = {};
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  }
});
export { app, analytics };
