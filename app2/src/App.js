import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { Routes, Route, HashRouter, Router } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './pages/PrivateRoute';
import './index.css';
import TaxCalculator from './components/Tax/TaxCalculator/TaxCalculator';
import IncomeCounter from './components/Income/IncomeCounter/IncomeCounter';
import BudgetPlanner from './components/Budget/BudgetPlanner/BudgetPlanner';
import ExpenseTracker from './components/Expense/ExpenseTracker/ExpenseTracker';
import MainStats from './components/Stats/MainStats/MainStats';

import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [users, setUsers] = useState([]);
  const currentUser = useAuth();

  useEffect(() => {
    const authenticateWithToken = async () => {
      
      const token = document.cookie.split('=')[1];
      
      if (token) {
        try {
          // Attempt to sign in with the token if no user is already signed in
   
          if (!currentUser.currentUser) {
            await signInWithCustomToken(auth, token);
            console.log("User logged in using ID token from cookie.");
          }
        } catch (error) {
          console.error("Error logging in with ID token:", error);
          // Handle token error (e.g., expired token)
        }
      } else { 
        await currentUser.logout();
        window.location.href = "http://localhost:3000/login";
      }

      console.log("done")
    };
    
    authenticateWithToken();
    
  }, [auth]);

  const usersCollectionRef = collection(firestore, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <HashRouter >
      
      <Routes>
        <Route
          index
          path="/"
          element={
            <PrivateRoute>
              <MainPage>
                <MainStats />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          index
          path="/income-tracker"
          element={
            <PrivateRoute>
              <MainPage>
                <IncomeCounter />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/tax-calculator"
          element={
            <PrivateRoute>
              <MainPage>
                <TaxCalculator />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/expense-tracker"
          element={
            <PrivateRoute>
              <MainPage>
                <ExpenseTracker />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/budget-planner"
          element={
            <PrivateRoute>
              <MainPage>
                <BudgetPlanner />
              </MainPage>
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
