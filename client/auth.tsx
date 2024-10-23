"use client";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebasenextjs-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { getToken } from "../server/getToken";

type FirebaseNextJSContextType = {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  currentUser: User | null;
};

const FirebaseNextJSContext = React.createContext<FirebaseNextJSContextType>({
  userLoggedIn: false,
  isEmailUser: false,
  currentUser: null,
} as FirebaseNextJSContextType);

export function getUserCS() {
  return useContext(FirebaseNextJSContext);
}

interface Props {
  children: React.ReactNode;
  renderEmptyBodyWhileLoading?: boolean;
}

export function FirebaseNextJSProvider({ children, renderEmptyBodyWhileLoading }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    if (user) {


      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      user.getIdToken(true).then(async function (idToken) {
        const sessionToken = await getToken({ idToken });
        document.cookie = `firebase_nextjs_token=${sessionToken}; expires=${new Date(Date.now() + 3600 * 1000 * 24 * 14).toUTCString()}; path=/;`;
      }).catch(async function (error) {
        console.error(error)
        console.error("FAILED TO GET ID TOKEN")

      });

      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      document.cookie = "firebase_nextjs_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser
  };

  return (
    <FirebaseNextJSContext.Provider value={value}>
      {(renderEmptyBodyWhileLoading && loading) ? <body /> : children}
    </FirebaseNextJSContext.Provider>
  );
}
