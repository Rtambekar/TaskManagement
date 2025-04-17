import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyAG3uGEDp2m7RSjqTnJVnrEbrdvqIGJjkw",
    authDomain: "taskauthentication-cfd5a.firebaseapp.com",
    projectId: "taskauthentication-cfd5a",
    storageBucket: "taskauthentication-cfd5a.firebasestorage.app",
    messagingSenderId: "1054733162187",
    appId: "1:1054733162187:web:adb8bce611a9803e166d4e",
    measurementId: "G-9BK49MCG5Z"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db, app };