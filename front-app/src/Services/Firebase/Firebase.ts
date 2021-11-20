import { initializeApp } from "firebase/app";
import { getFirestore, doc } from 'firebase/firestore';
import { Auth, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDqNm6WKmHyEGRVfVOQnUQ5GZRg4rdreXc",
  authDomain: "plml-lightmanager.firebaseapp.com",
  projectId: "plml-lightmanager",
  storageBucket: "plml-lightmanager.appspot.com",
  messagingSenderId: "479507797821",
  appId: "1:479507797821:web:69026f6fa3c017ff0d5754"
};

const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export const useAuth = () => useAuthState(auth);

const googleProvider = new GoogleAuthProvider();
export const googleSignIn = async () => {

    try {
        await signInWithPopup(auth, googleProvider);
    }
    catch(error: any) {
        console.log(error);
    }
}

export const userSignOut = async () => {
    
    try {
        await signOut(auth);
    }
    catch(error: any) {
        console.log(error);
    }
}


const firestore = getFirestore(app);

export const getDocument = (path: string) => {
    return doc(firestore, path);
}