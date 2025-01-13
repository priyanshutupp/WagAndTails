import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "Your-API-Key",
  authDomain: "wag-and-tails.firebaseapp.com",
  projectId: "wag-and-tails",
  storageBucket: "wag-and-tails.firebasestorage.app",
  messagingSenderId: "551458536671",
  appId: "1:551458536671:web:708f9e18a2fb1a9678fd6a",
  measurementId: "G-65D0VX1V6G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 
