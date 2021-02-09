import "./Post.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { database } from "../../../Auth/Fire";
import Chat from "../../Pages/Chat/Chat";
import ChatMessage from "../../Pages/Chat/ChatMessage";
import { Link } from "react-router-dom";
import Comment from "../../Pages/Comment/Comment";
import Timer from "../Timer/Timer";

const Post = ({ data, makeBet, currentUser }) => {
  const [betMade, setBetMade] = useState(data.userMadeBet);
	
	const deadline = new Date(data.post.deadline);
	const deadlineString = deadline.toLocaleDateString('ru-RU');
	// const startdate = new Date(data.post.startdate);
	// const startdateString = startdate.toLocaleDateString('ru-RU');

  const makeUserBet = (post, user, bet) => {
    if (betMade) {
      return;
    }
    makeBet(post, user, bet);
    setBetMade(true);
  };

  return (
    <div className="container-post">
      <div className="card my-2">
        <div className="card-name">{data.post.title}</div>
        <hr style={{ width: "100%" }} />
        <div className="card-title">
          <div className="card-info px-3">
            <img
              src={data.author.photoURL}
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            <div className="card-info-text">
              <p className="card-text">{data.author.name}</p>
              <p className="card-text">{data.post.description}</p>
              <p className="card-text">{deadlineString}</p>
              <p className="card-text">{data.post.done}</p>
              <div className="commentBox">
                {data.comments.map((el) => (
                  <div className="commentOne my-1">
                    <img src={el.photoURL} alt="photo" width="30%" />
                    <p>{el.displayName}</p>
                    <p>{el.text}</p>
                    <p>{el.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="buttons">
            <span className="card-title">{data.betsFor}</span>
            <button
              onClick={() => makeUserBet(data.id, currentUser.uid, true)}
              className={data.userMadeBet === true ? "bet-active" : ""}
            >
              Сдержит
            </button>
            <button
              onClick={() => makeUserBet(data.id, currentUser.uid, false)}
              className={data.userMadeBet === false ? "bet-active" : ""}
            >
              Не сдержит
            </button>
            <span className="card-title"> {data.betsAgainst}</span>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <Comment postId={data.id} />
        <Timer />
      </div>
    </div>
  );
};

export default Post;
