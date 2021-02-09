import './ProfilePost.css'
import { useState } from 'react'

const ProfilePost = ({ data, makeBet, currentUser }) => {
  const [betMade, setBetMade] = useState(false)

	const deadline = new Date(data.post.deadline);
	const deadlineString = deadline.toLocaleDateString('ru-RU');

  const makeUserBet = (post, user, bet) => {
    if (betMade) {
      return
    }
    makeBet(post, user, bet)
    setBetMade(true)
  }



  return (
    <div className="post-container my-3 mx-3">
      <p>{data.post.title}</p>
      <p>{data.author.name}</p>
      <p>{data.post.description}</p>
      <p>{deadlineString}</p>
      <p>{data.post.done}</p>
      </div>
  )
}

export default ProfilePost
