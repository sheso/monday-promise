import './Post.css';

const Post = ({data, like, unlike}) => {
	return (
		<div className="post-container">
			<p>{data.post.title}</p>
			<p>{data.author.name}</p>
			<p>{data.post.description}</p>
			<p>{data.post.deadline}</p>
			<p>{data.post.done}</p>
			<p>
				<span>
					{
						data.userLiked ? 
							<button onClick={() => unlike(data.id)}>{':)'}</button> : 
							<button onClick={() => like(data.id)}>{':('}</button> 
					}
				</span>
				<span>{data.likes}</span>
			</p>
		</div>
	)
}

export default Post;
