"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import AuthProvider from "./hooks/AuthContext";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth }  from '../lib/firebase.js'
// import { useAuth } from "./";
import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
    </Provider>
      </body>
    </html>
  );
}
