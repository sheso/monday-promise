import { createContext, useEffect, useState } from "react";
import fire from "../Auth/Fire";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  console.log(currentUser);

  useEffect(() => {
    fire.auth().onAuthStateChanged((currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        console.log(currentUser);
        setCurrentUser(currentUser.displayName);
        setUserPhoto(currentUser.photoURL);
      } else {
        setCurrentUser(null);
        setUserPhoto("http://penoksal.ru/images/imgcont16.png");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userPhoto, setUserPhoto }}
    >
      {children}
    </AuthContext.Provider>
  );
};
