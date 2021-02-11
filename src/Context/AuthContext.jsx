import { createContext, useEffect, useState } from "react";
import firebase from "firebase";
import { fire, database } from "../Auth/Fire";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fire.auth().onAuthStateChanged((current) => {
      setCurrentUser(current ? { ...current } : null);
      setAuthInitialized(true);
      console.log("listener onAuthStateChange", !!current);
      if (current) {
        database.users.doc(current.uid).set({
          name: current.displayName,
          email: current.email,
          photoURL: current.photoURL,
        });
      }
    });
  }, []);

  const login = async (login) => {
    try {
      await fire.auth().signInWithEmailAndPassword(login.email, login.password);
    } catch (error) {
      alert(error);
      history.push("/login");
    }
  };

  const signup = async (inputs) => {
    console.log("inputs register", inputs);
    try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password);
      let user = fire.auth().currentUser;
      await user.updateProfile({
        displayName: inputs.name,
      });
      setCurrentUser({ ...fire.auth().currentUser });
    } catch (error) {
      alert(error);
      history.push("/register"); // TODO: handle errors
    }
  };

  const googleLogin = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      await fire.auth().signInWithPopup(googleProvider);
    } catch (err) {
      alert(err);
      history.push("/login");
    }
  };

  const signout = async () => {
    await fire.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        googleLogin,
        signout,
        setCurrentUser,
      }}
    >
      {authInitialized && children}
    </AuthContext.Provider>
  );
};
