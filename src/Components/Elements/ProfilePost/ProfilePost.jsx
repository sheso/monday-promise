import "./ProfilePost.css";
import { CONTRACT_FAIL, finishContract } from "../../../databaseHandlers";
import { CONTRACT_ACTIVE } from "../../../databaseHandlers";

const ProfilePost = ({ data, currentUser, setForceUpdate }) => {
  const deadline = new Date(data.post.deadline);
  const deadlineString = deadline.toLocaleDateString("ru-RU");

  const userFinishContract = async () => {
    await finishContract(data.id);
    setForceUpdate((pre) => !pre);
  };

  return (
    // <div className="post-container my-3 mx-3">
    //   <p>{data.post.title}</p>
    //   <p>{data.author.name}</p>
    //   <p>{data.post.description}</p>
    //   <p>{deadlineString}</p>
    //   {data.post.status === CONTRACT_ACTIVE && <button onClick={userFinishContract}>Выполнить обещание</button>}
    //   </div>
    <div className="post-container-lk my-5 mx-5">
      {data.post.status === CONTRACT_ACTIVE ? (
        <>
          <div className="toptext active">
            <p>{data.post.title}</p>
          </div>
          <p>{data.post.description}</p>
          <p>{deadlineString}</p>

          <button className="lkbutton" onClick={userFinishContract}>
            Выполнить обещание
          </button>
        </>
      ) : data.post.status === CONTRACT_FAIL ? (
        <>
          <div className="toptext fail">
            <p>{data.post.title}</p>
          </div>
          <p>{data.post.description}</p>
          <p>{deadlineString}</p>
        </>
      ) : (
        <>
          <div className="toptext done">
            <p>{data.post.title}</p>
          </div>
          <p>{data.post.description}</p>
          <p>{deadlineString}</p>
        </>
      )}
    </div>
  );
}

export default ProfilePost
