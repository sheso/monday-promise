import firebase from 'firebase/app'
import 'firebase/database'
// import admin from 'firebase-admin'
const auth = firebase.auth()

const Friends = () => {
  console.log(auth())
  return <div>This is Friends</div>
}

export default Friends
