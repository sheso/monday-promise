import "./Post.css";
import { useState } from "react";
import Comment from "../../Pages/Comment/Comment";
import Timer from "../Timer/Timer";
import {
  CONTRACT_ACTIVE,
  CONTRACT_FAIL,
  CONTRACT_SUCCESS,
} from "../../../databaseHandlers";
import { setTimer } from "../../../databaseHandlers";

const Post = ({ data, makeBet, currentUser, setForceUpdate }) => {
  const [betMade, setBetMade] = useState(data.userMadeBet);

  const deadline = new Date(data.post.deadline);
  const deadlineString = deadline.toLocaleDateString("ru-RU");
  const startdate = new Date(data.post.createdAt);
  const currentDate = new Date();

  data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const makeUserBet = (post, user, bet) => {
    if (betMade) {
      return;
    }
    makeBet(post, user, bet);
    setBetMade(true);
  };

  const timerData = setTimer(
    startdate.getTime(),
    currentDate.getTime(),
    deadline.getTime()
  );

  return (
    <div className="container-post my-3">
      <div className="card my-2">
        {data.post.status === CONTRACT_FAIL ? (
          <div className="card-name fail">
            <h3 className="my-4" style={{ fontWeight: "600" }}>
              {data.post.title}
            </h3>
          </div>
        ) : data.post.status === CONTRACT_SUCCESS ? (
          <div className="card-name done">
            <h3 className="my-4" style={{ fontWeight: "600" }}>
              {data.post.title}
            </h3>
          </div>
        ) : (
          <div className="card-name active">
            <h3 className="my-4" style={{ fontWeight: "600" }}>
              {data.post.title}
            </h3>
          </div>
        )}
        <div className="card-title">
          <div className="card-info px-2 py-2">
            <div className="left-info">
              {data.author.photoURL ? (
                <img
                  src={data.author.photoURL}
                  style={{ borderRadius: "50%", marginRight: "15px" }}
									alt={data.author.name}
                />
              ) : (
                <img
                  src="../../../images/pinky-promise-small.png"
                  style={{
                    borderRadius: "50%",
                    marginRight: "15px",
                    width: "20%",
                  }}
									alt={data.author.name}
                />
              )}
              <div className="card-info-text ">
                <p className="card-text">{data.author.name}</p>
                <p className="card-text">{data.post.description}</p>
                <p className="card-text">{data.post.why}</p>
                <p className="card-text">{deadlineString}</p>
                <p className="card-text">{data.post.done}</p>
              </div>
            </div>
            {data.post.status === CONTRACT_ACTIVE ? (
              <Timer {...timerData} />
            ) : data.post.status === CONTRACT_FAIL ? (
              <img
                width="30%"
                src="../../../../images/141-1416726_wasted-transparent-gta-wasted-transparent.png"
								alt="Обещание не выполнено"
              />
            ) : (
              <img width="22%" src="../../../../images/medal-pngrepo-com.png" alt="Обещание выполнено" />
            )}
          </div>

          {data.post.status === CONTRACT_ACTIVE ? (
            <div className="buttons">
              <button
                onClick={() => makeUserBet(data.id, currentUser.uid, true)}
                className={
                  data.userMadeBet === true ? "bet-active" : "postbutton"
                }
              >
                Сдержит 👍 : {data.betsFor}
              </button>
              <button
                onClick={() => makeUserBet(data.id, currentUser.uid, false)}
                className={
                  data.userMadeBet === false ? "bet-active" : "postbutton"
                }
              >
                Не сдержит 👎 : {data.betsAgainst}
              </button>
            </div>
          ) : null}
        </div>
        <hr style={{ width: "100%", color: "#007cc7" }} />
        <div className="commentBox">
          {data.comments.map((el) => (
            <div className="commentOne my-1">
              <img
                src={el.photoURL}
                alt={el.displayName}
                style={{ width: "70px", height: "70px" }}
              />
              <div className="commentLeft">
                <p>{el.displayName}</p>
                <p>{el.createdAt}</p>
              </div>
              <p className="lefttextcomm">{el.text}</p>
            </div>
          ))}
        </div>
        <Comment postId={data.id} setForceUpdate={setForceUpdate} />
      </div>
    </div>
  );
};

export default Post;
