import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${getEnv("VITE_FIREBASE_API")}`,
  authDomain: "blogapp-afe7c.firebaseapp.com",
  projectId: "blogapp-afe7c",
  storageBucket: "blogapp-afe7c.firebasestorage.app",
  messagingSenderId: "811719303765",
  appId: "1:811719303765:web:5d111e3ec092c0fd94eadc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
