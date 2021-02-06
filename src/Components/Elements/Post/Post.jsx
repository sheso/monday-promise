const Post = ({data}) => {
	return (
		<div className="post-container">
			<p>{data.post.title}</p>
			<p>{data.author.name}</p>
			<p>{data.post.description}</p>
			<p>{data.post.deadline}</p>
			<p>{data.post.done}</p>
		</div>
	)
}

export default Post;
