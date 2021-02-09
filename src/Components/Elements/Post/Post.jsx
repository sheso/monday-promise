import "./Post.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { database } from "../../../Auth/Fire";
import Chat from "../../Pages/Chat/Chat";
import ChatMessage from "../../Pages/Chat/ChatMessage";
import { Link } from "react-router-dom";
import Comment from "../../Pages/Comment/Comment";

const Post = ({ data, makeBet, currentUser }) => {
  const [betMade, setBetMade] = useState(false);

  const makeUserBet = (post, user, bet) => {
    if (betMade) {
      return;
    }
    makeBet(post, user, bet);
    setBetMade(true);
  };

  
  

  return (
    <div className="post-container my-3 mx-3">
      <p>{data.post.title}</p>
      <p>{data.author.name}</p>
      <p>{data.post.description}</p>
      <p>{data.post.deadline}</p>
      <p>{data.post.done}</p>
      <div className="buttons">
        <span>Сдержит: {data.betsFor}</span>
        <button
          onClick={() => makeUserBet(data.id, currentUser.uid, true)}
          className={data.userMadeBet === true ? "bet-active" : ""}
        >
          👍
        </button>
        <button
          onClick={() => makeUserBet(data.id, currentUser.uid, false)}
          className={data.userMadeBet === false ? "bet-active" : ""}
        >
          👎
        </button>
        <span>Не сдержит: {data.betsAgainst}</span>
       <p><Comment postId={data.id}/></p>
      </div>
    </div>
  );
};

export default Post;
