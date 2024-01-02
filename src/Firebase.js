// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0zSuwaObUusRvFx5ptm6GKielGLx-7nE",
  authDomain: "smartboat-3291b.firebaseapp.com",
  projectId: "smartboat-3291b",
  storageBucket: "smartboat-3291b.appspot.com",
  messagingSenderId: "124780714784",
  appId: "1:124780714784:web:00d482bb512bbd439b9545",
  measurementId: "G-4MGC09PD6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
