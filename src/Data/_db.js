// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDpRtGWTfRX8ahbaOl5twJ3fMmyVtfjoo",
    authDomain: "task-manager-81d12.firebaseapp.com",
    projectId: "task-manager-81d12",
    storageBucket: "task-manager-81d12.appspot.com",
    messagingSenderId: "8034054979",
    appId: "1:8034054979:web:905fe67e461586d650b5f6"
};

// Initialize Firebase
const fbapp = initializeApp( firebaseConfig );
const db = getFirestore( fbapp );

export { fbapp, db };
