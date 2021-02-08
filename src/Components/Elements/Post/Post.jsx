import "./Post.css";
import { useState } from 'react';

const Post = ({ data, makeBet, currentUser }) => {
	const [betMade, setBetMade] = useState(false);

	const makeUserBet = (post, user, bet) => {
		if (betMade) {
			return;
		}
		makeBet(post, user, bet);
		setBetMade(true);
	}

  return (
    <div className="post-container my-1 mx-1">
      <p>{data.post.title}</p>
      <p>{data.author.name}</p>
      <p>{data.post.description}</p>
      <p>{data.post.deadline}</p>
      <p>{data.post.done}</p>
			<div className="buttons">
				<span>За: {data.betsFor}</span>
				<button 
					onClick={() => makeUserBet(data.id, currentUser.uid, true)} 
					className={data.userMadeBet === true ? 'bet-active' : ''}
				>
					👍
				</button>
				<button 
					onClick={() => makeUserBet(data.id, currentUser.uid, false)} 
					className={data.userMadeBet === false ? 'bet-active' : ''}
				>
					👎
				</button>
				<span>Против: {data.betsAgainst}</span>
      </div>
    </div>
  );
};

export default Post;
