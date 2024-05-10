// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD69L5-2vgSeKO7IT_YP0yTRNisNmOh_KA",

  authDomain: "popular-opinion-poll.firebaseapp.com",

  projectId: "popular-opinion-poll",

  storageBucket: "popular-opinion-poll.appspot.com",

  messagingSenderId: "1077991157918",

  appId: "1:1077991157918:web:11ded78ab656820b320b8f",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//inputs
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

//submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Creating account");
      window.location.href = "index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
