import { createContext, useEffect, useState } from "react";
import firebase from "firebase";
import { fire, database } from "../Auth/Fire";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	
	useEffect(() => {
		fire.auth().onAuthStateChanged((current) => {
			setCurrentUser(current);
			if (current) {
				database.users.doc(current.uid).set({
					name: current.displayName,
					email: current.email,
				});
			}
		});
	}, []);

	const login = async (login) => {
    try {
      await fire.auth().signInWithEmailAndPassword(login.email, login.password);
    } catch (error) {
      alert(error);
    }
  };

	const signup = (inputs) => {
    try {
      fire
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(() => {
          let user = fire.auth().currentUser;
          user.updateProfile({
            displayName: inputs.name,
          });
        });
    } catch (error) {
      alert(error); // TODO: handle errors
    }
  };

	const googleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      fire
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          console.log('success', result);
				});
    } catch (err) {
      alert(err);
    }
  };

	const signout = () => {
    fire.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, signup, googleLogin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
