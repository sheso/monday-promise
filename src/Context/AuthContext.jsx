import { createContext, useEffect, useState } from "react";
import fire from "../Auth/Fire";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  console.log(currentUser);

  useEffect(() => {
    fire.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setCurrentUser(currentUser.displayName);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
