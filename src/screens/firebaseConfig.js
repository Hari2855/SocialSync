import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBWqYZ8B2g1-7Wv8gK-z-MQGGlGeHQ-6w4',
  authDomain: 'socialsync-f0bc9.firebaseapp.com',
  projectId: 'socialsync-f0bc9',
  storageBucket: 'socialsync-f0bc9.firebasestorage.app',
  messagingSenderId: '957952848635',
  appId: '1:957952848635:android:ca515fa8db0f3518b5365e',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, auth};
