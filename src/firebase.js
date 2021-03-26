import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
// Add the Performance Monitoring library
import "firebase/performance";

const config = {
    apiKey: "AIzaSyDoSoAxXS4Pl5aqCQjxQLS2Kn44FMeZhk8",
    authDomain: "beepr-de.firebaseapp.com",
    databaseURL: "https://beepr-de.firebaseio.com",
    projectId: "beepr-de",
    storageBucket: "beepr-de.appspot.com",
    messagingSenderId: "542802919832",
    appId: "1:542802919832:web:af730a8852800d00",
    measurementId: "G-VM3PTVPNN6"
}; 
firebase.initializeApp(config);
firebase.database();
firebase.storage();
// Initialize Performance Monitoring and get a reference to the service
firebase.performance();


export default firebase;