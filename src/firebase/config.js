import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnCbTfL2A2_El8ekn6AlVwO8HkcXOgmnE",
  authDomain: "national-day-b9906.firebaseapp.com",
  projectId: "national-day-b9906",
  storageBucket: "national-day-b9906.appspot.com",
  messagingSenderId: "100150236730",
  appId: "1:100150236730:web:79f7a21f6395542f0d4703"
};
// init firebase
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const timeStamps = firebase.firestore.Timestamp
// init firestore service
const projectAuth = firebase.auth();
// export firestore
export { projectAuth,projectFirestore,timeStamps };
