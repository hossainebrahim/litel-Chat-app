import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC06RtJserNbovLehi1qMzgrJ5jQNTBnxQ",
  authDomain: "chatapp-68bdf.firebaseapp.com",
  projectId: "chatapp-68bdf",
  storageBucket: "chatapp-68bdf.appspot.com",
  messagingSenderId: "731661783007",
  appId: "1:731661783007:web:7e96c0ec6ee0f08f47be6a",
};

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, db, storage, timestamp };
