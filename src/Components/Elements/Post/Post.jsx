const Post = ({data}) => {
	return (
		<div className="post-container">
			<p>{data.title}</p>
			<p>{data.description}</p>
			<p>{data.deadline}</p>
			<p>{data.done}</p>
		</div>
	)
}

export default Post;
