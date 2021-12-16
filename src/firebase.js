import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyALynHq0MfyARQ94_1UER0xB6sf9EW7OBs',
  authDomain: 'todo-app-545b3.firebaseapp.com',
  projectId: 'todo-app-545b3',
  storageBucket: 'todo-app-545b3.appspot.com',
  messagingSenderId: '761164363913',
  appId: '1:761164363913:web:700eba7ed296ccbc276e58',
  measurementId: 'G-E1WW7E66X8',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
