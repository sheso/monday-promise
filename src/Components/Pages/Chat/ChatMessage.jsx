import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { database } from '../../../Auth/Fire'

const ChatMessage = ({ text, uid, photoURL, displayName }) => {

  const [userName, setUserName] = useState('')

  const { currentUser } = useContext(AuthContext)

  const messageClass = uid === currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            'https://i.pinimg.com/originals/4b/c9/a4/4bc9a425e50ac0551a517a0c41f00f91.jpg'
          }
          width="40px"
          height="40px"
          alt="userpic"
        />
        <p>{displayName}</p>
        <p>{text}</p>
      </div>
    </>
  )
}
export default ChatMessage
