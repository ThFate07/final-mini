import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "AIzaSyB32u1-H2a2S8aujjoFV_T7IGQzWVRaJ7M",
  authDomain: "localhost:4000",
  projectId: "personal-productivity-hub",
  storageBucket: "personal-productivity-hub.firebasestorage.ap",
  messagingSenderId: "944388494371",
  appId: "1:944388494371:web:7a94b93b8b1be29a808d96",
});

const auth = getAuth(app);
const firestore = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to browserLocalPersistence.');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { auth, firestore };
