import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD7HJzS6k3vk-ON_x3AYM397etB7nU6m4A",
    authDomain: "fashion-world-store.firebaseapp.com",
    projectId: "fashion-world-store",
    storageBucket: "fashion-world-store.appspot.com",
    messagingSenderId: "864144128893",
    appId: "1:864144128893:web:6420d8ab4cc09150b86a14",
    measurementId: "G-0CN6JJ3RSB"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
