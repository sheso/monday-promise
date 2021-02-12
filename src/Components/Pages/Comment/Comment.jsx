import { useContext, useRef, useState } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";

const Comment = ({ postId, setForceUpdate }) => {
  const { currentUser } = useContext(AuthContext);
  const scroll = useRef();

  const commentsRef = database.comments;

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, photoURL, displayName } = currentUser;
    await commentsRef.add({
      text: formValue,
      createdAt: database.getCreatedAt(),
      uid,
      displayName,
      photoURL,
      contractID: postId,
    });
    setFormValue("");
    // scroll.current.scrollIntoView({ behavior: "smooth" });
    setForceUpdate((pre) => !pre);
  };
  return (
    <div className="commentChat">
      <main>
        <span ref={scroll} />
      </main>
      <form onSubmit={sendMessage} className="chatForm">
        <input
          value={formValue}
          onChange={(event) => setFormValue(event.target.value)}
          placeholder="Введите сообщение"
        />
        <button type="submit" disabled={!formValue}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Comment;
