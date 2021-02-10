import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const CommentMessage = ({ text, uid, photoURL, displayName }) => {
  const [userName, setUserName] = useState("");

  const { currentUser } = useContext(AuthContext);
  console.log(uid, "uid");
  console.log(currentUser, "user");

  const commentsClass = uid === currentUser.uid ? "sent" : "received";

  return (
    <div className="mesDes my-2">
      <div className={`message-${commentsClass} my-3 mx-3`}>
        <img
          src={
            photoURL ||
            "http://planetasharov.ru/upload/shop_1/1/3/4/item_1348/shop_items_catalog_image1348.jpg"
          }
          width="50px"
          height="50px"
          alt="userpic"
          style={{ borderRadius: "10px" }}
        />
        <p style={{ color: "#426696", fontWeight: "600" }}>{displayName}</p>
        <p className="textMes">{text}</p>
      </div>
    </div>
  );
};

export default CommentMessage;
