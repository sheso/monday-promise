import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB8OCnW9JqyaNmsjcm9_EcEUpwJ_whMNgw",
  authDomain: "monday-promise.firebaseapp.com",
  projectId: "monday-promise",
  storageBucket: "monday-promise.appspot.com",
  messagingSenderId: "897489809068",
  appId: "1:897489809068:web:e0976d71ac8a671a0cf909",
};
// Initialize Firebase

const fire = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
const database = {
	contracts: firestore.collection('contracts'),
	users: firestore.collection('users'),
	messages: firestore.collection('messages'),
  chats: firestore.collection('chats'),
  comments: firestore.collection('comments'),
	subscriptions: firestore.collection('subscriptions'),
	likes: firestore.collection('likes'),
	bets: firestore.collection('bets'),
	getCreatedAt: firebase.firestore.FieldValue.serverTimestamp,
  increment: firebase.firestore.FieldValue.increment,
	Timestamp: firebase.firestore.Timestamp,
  batch: firestore.batch,
};

export { fire, database };
