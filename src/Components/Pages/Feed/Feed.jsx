import { useState, useEffect } from 'react';
import Post from '../../Elements/Post/Post';
import {fire, database} from '../../../Auth/Fire';
import './Feed.css';

const Feed = () => {
	const [promiseList, setPromiseList] = useState([]);

	useEffect(() => {
		
		const fetchFeedData = async () => {
			const subscriptions = database.subscriptions
				.where('src', '==', database.users.doc(fire.auth().currentUser.uid)).get();
			const authorRefs = (await subscriptions).docs.map(doc => doc.data().dest);
			if (!authorRefs.length) return;
			console.log(authorRefs);
			const posts = await database.promises.where('author', 'in', authorRefs).get();

			const feed = [];
			for (let post of posts.docs) {
				const authorSnapshot = await post.data().author.get();
				const authorData = authorSnapshot.data();
				feed.push({
					author: authorData,
					post: post.data(),
				});
			}
			setPromiseList(feed);
		}

		fetchFeedData();
	}, []);

	console.log(promiseList);
	return (
		<div className="feed-container">
		{promiseList.length ? promiseList.map(promise => (
			<Post key={promise.id} data={promise} />
		)) : 'No posts'}
		</div>
	);
};

export default Feed;
