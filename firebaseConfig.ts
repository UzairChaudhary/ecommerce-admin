// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC2JTBrmrXI8pOg7Kk3YNPaaLKjATaF170",

  authDomain: "ecommerce-nextjs-64c85.firebaseapp.com",

  projectId: "ecommerce-nextjs-64c85",

  storageBucket: "ecommerce-nextjs-64c85.appspot.com",

  messagingSenderId: "656910820610",

  appId: "1:656910820610:web:f0f14b75c71e48b3c60e1b",

  measurementId: "G-TWNFGMJCM0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


export const storage = getStorage()