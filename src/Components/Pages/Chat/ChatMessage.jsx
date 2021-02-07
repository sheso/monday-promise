import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

const ChatMessage = ({ text, uid, photoURL, displayName }) => {
	const { currentUser } = useContext(AuthContext);
  const messageClass = uid === currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            "https://i.pinimg.com/originals/57/7c/eb/577ceb09b2de9557a93ccb625a38c678.jpg"
          }
					alt='userpic'
        />
        <p>{displayName}</p>
        <p>{text}</p>
      </div>
    </>
  );
};
export default ChatMessage;
