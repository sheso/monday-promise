import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { database } from "../../../Auth/Fire";
import "./Chat.css";

const ChatMessage = ({ text, uid, photoURL, displayName }) => {
  const [userName, setUserName] = useState("");

  const { currentUser } = useContext(AuthContext);

  const messageClass = uid === currentUser.uid ? "sent" : "received";

  return (
    <div className="mesDes my-2">
      <div className={`message-${messageClass} my-3 mx-3`}>
        <img
          src={
            photoURL ||
            "https://i.pinimg.com/originals/4b/c9/a4/4bc9a425e50ac0551a517a0c41f00f91.jpg"
          }
          width="50px"
          height="50px"
          alt="userpic"
          style={{ borderRadius: "10px" }}
        />
        <p style={{ color: "#426696", fontWeight: "600" }}>{displayName}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
