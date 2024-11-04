import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore'; // Import doc from Firestore
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { nanoid } from 'nanoid';
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(name, email, password) {

    const initTodoList = {
      _id: nanoid(),
      name: "New List",
      data: [],
      sort: null,
      filter: null,
    };

    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          console.log(cred.user);
          const userDocRef = doc(firestore, 'users', cred.user.uid);
          const setData = setDoc(userDocRef, {
            incomes: {},
            expenses: {},
            money: {
              totalCard: 0,
              totalCash: 0,
              totalSavings: 0,
              totalMoney: 0,
            },
            totalTax: 0,
            totalExpense: 0,
            TodoLists: [initTodoList]
          });

          setData.then(() => { 
            console.log('saved data')
          })

          const uidToken = cred.user.uid
          axios.post('http://localhost:3002/generateToken', { uidToken }).then((response) => {
            document.cookie= `token=${response.data.customToken}; path=/; domain=localhost`;
            console.log('adding token successfull');
          
          });

        });
      }
    );
  }

  async function login(email, password) {
    const userCred = await  signInWithEmailAndPassword(auth, email, password);

    const uidToken = userCred.user.uid;
    const response = await axios.post('http://localhost:3002/generateToken', { uidToken });

    document.cookie= `token=${response.data.customToken}; path=/; domain=localhost`;
    console.log('adding token successfull');
    return userCred;
  }

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
