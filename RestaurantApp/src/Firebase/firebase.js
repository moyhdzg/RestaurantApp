import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_MOE_API_KEY,
    authDomain: "vite-projectexample.firebaseapp.com",
    projectId: "vite-projectexample",
    storageBucket: "vite-projectexample.appspot.com",
    messagingSenderId: "905285583447",
    appId: "1:905285583447:web:09abbe4cd772f650c59912"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db}