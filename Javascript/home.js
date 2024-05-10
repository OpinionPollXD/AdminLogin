// Importer Firebase
import firebase from "https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js";

// Din Firebase konfiguration
var firebaseConfig = {
  apiKey: "AIzaSyD69L5-2vgSeKO7IT_YP0yTRNisNmOh_KA",
  authDomain: "popular-opinion-poll.firebaseapp.com",
  projectId: "popular-opinion-poll",
  storageBucket: "popular-opinion-poll.appspot.com",
  messagingSenderId: "1077991157918",
  appId: "1:1077991157918:web:11ded78ab656820b320b8f",
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Tjek auth state
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // Brugeren er ikke logget ind, omdiriger til login side
    window.location.href = "index.html";
  }
});

// Logout funktion
function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // User is signed out.
      // Redirect to the login page
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
}
