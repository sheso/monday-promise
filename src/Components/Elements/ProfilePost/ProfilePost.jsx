import "./ProfilePost.css";
import { useState } from "react";
import Timer from "../Timer/Timer";

const ProfilePost = ({ data, makeBet, currentUser }) => {
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
      <Timer />
    </div>
  );
};

export default ProfilePost;
