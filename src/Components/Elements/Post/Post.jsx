import "./Post.css";

const Post = ({ data, like, unlike }) => {
  return (
    <div className="post-container my-1 mx-1">
      <p>{data.post.title}</p>
      <p>{data.author.name}</p>
      <p>{data.post.description}</p>
      <p>{data.post.deadline}</p>
      <p>{data.post.done}</p>
      <p>
        <span>
          {data.userLiked ? (
            <button onClick={() => unlike(data.id)} className="unlike">
              {":)"}
            </button>
          ) : (
            <button onClick={() => like(data.id)} className="like">
              {":("}
            </button>
          )}
        </span>
        <span>{data.likes}</span>
      </p>
    </div>
  );
};

export default Post;
