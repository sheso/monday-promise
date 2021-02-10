import "./Post.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { database } from "../../../Auth/Fire";
import Chat from "../../Pages/Chat/Chat";
import ChatMessage from "../../Pages/Chat/ChatMessage";
import { Link } from "react-router-dom";
import Comment from "../../Pages/Comment/Comment";
import Timer from "../Timer/Timer";
import {CONTRACT_ACTIVE} from '../../../databaseHandlers'
import { setTimer } from '../../../databaseHandlers';

const Post = ({ data, makeBet, currentUser, setForceUpdate }) => {
  const [betMade, setBetMade] = useState(data.userMadeBet);

  const deadline = new Date(data.post.deadline);
  const deadlineString = deadline.toLocaleDateString("ru-RU");
  const startdate = new Date(data.post.createdAt);
	const currentDate = new Date();

  const makeUserBet = (post, user, bet) => {
    if (betMade) {
      return;
    }
    makeBet(post, user, bet);
    setBetMade(true);
  };

	const timerData = setTimer(startdate.getTime(), currentDate.getTime(), deadline.getTime());
	
	console.log('dates', startdate, currentDate, deadline);
	console.log('timerdata', setTimer(startdate.getTime(), currentDate.getTime(), deadline.getTime()));

  return (
    <div className="container-post">
      <div className="card my-2">
        <div className="card-name">
          <h3 style={{ fontWeight: "600" }}>{data.post.title}</h3>
        </div>
        <hr style={{ width: "100%", color: "#007cc7" }} />
        <div className="card-title">
          <div className="card-info px-2 py-2">
            <img
              src={data.author.photoURL}
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            <div className="card-info-text ">
              <p className="card-text">{data.author.name}</p>
              <p className="card-text">{data.post.description}</p>
              <p className="card-text">{deadlineString}</p>
              <p className="card-text">{data.post.done}</p>
            </div>
            <Timer { ...timerData } />
          </div>
          
          {data.post.status === CONTRACT_ACTIVE ? 
          <div className="buttons">
            <button
              onClick={() => makeUserBet(data.id, currentUser.uid, true)}
              className={
                data.userMadeBet === true ? "bet-active" : "postbutton"
              }
            >
              Сдержит: {data.betsFor}
            </button>
            <button
              onClick={() => makeUserBet(data.id, currentUser.uid, false)}
              className={
                data.userMadeBet === false ? "bet-active" : "postbutton"
              }
            >
              Не сдержит: {data.betsAgainst}
            </button>
          </div>  : null}
        </div>
        <hr style={{ width: "100%", color: "#007cc7" }} />
        <div className="commentBox">
          {data.comments.map((el) => (
            <div className="commentOne my-1">
              <img
                src={el.photoURL}
                alt="photo"
                style={{ width: "70px", height: "70px" }}
              />
              <div className="commentLeft">
                <p>{el.displayName}</p>
                <p>{el.createdAt}</p>
              </div>
              <p>{el.text}</p>
            </div>
          ))}
        </div>
        <Comment postId={data.id} setForceUpdate={setForceUpdate} />
      </div> 
    </div>
  );
};

export default Post;
