import './ProfilePost.css'
import { useState } from 'react'
import { finishContract } from '../../../databaseHandlers';
import { CONTRACT_ACTIVE } from '../../../databaseHandlers';

const ProfilePost = ({ data, currentUser }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  console.log(data.post.createdAt, 'hello form profile');


  const deadline = new Date(data.post.deadline);
  const deadlineString = deadline.toLocaleDateString("ru-RU");

	const userFinishContract = () => {
		finishContract(data.id, currentUser.uid);
		setForceUpdate(pre => !pre);
	}

  return (
    // <div className="post-container my-3 mx-3">
    //   <p>{data.post.title}</p>
    //   <p>{data.author.name}</p>
    //   <p>{data.post.description}</p>
    //   <p>{deadlineString}</p>
    //   {data.post.status === CONTRACT_ACTIVE && <button onClick={userFinishContract}>Выполнить обещание</button>}
    //   </div>

    <div className="post-container my-3 mx-3">
      {data.post.status === CONTRACT_ACTIVE ? 
        <>
        <h2>Текущие обещания</h2>
        <p>{data.post.title}</p>
          <p>{data.author.name}</p>
          <p>{data.post.description}</p>
          <p>{deadlineString}</p>
          <button onClick={userFinishContract}>Выполнить обещание</button>
        </>
       : 
        <>
       <h2>Прошлые обещания</h2>
       <p>{data.post.title}</p>
       <p>{data.author.name}</p>
       <p>{data.post.description}</p>
       <p>{deadlineString}</p>
       </>
          } 
    </div>

  )
}

export default ProfilePost;
