import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBgZYJoUhN2if_IeCB-RQB2Hz_yV_ZCfV8",
  authDomain: "simple-todo-app-c5a3b.firebaseapp.com",
  projectId: "simple-todo-app-c5a3b",
  storageBucket: "simple-todo-app-c5a3b.appspot.com",
  messagingSenderId: "740962103721",
  appId: "1:740962103721:web:d847f722b57dc69d2894b8",
  measurementId: "G-J6X7HZLJ46",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const email = "admin@tutorial-backend.gov";
const password = "s3cretp4ssw0rd";

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export const db = firebaseApp.firestore();
