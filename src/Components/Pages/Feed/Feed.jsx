import { useState, useEffect } from 'react';
import Post from '../../Elements/Post/Post';
import {fire, database} from '../../../Auth/Fire';
import './Feed.css';

const Feed = () => {
	const [contractsList, setContractsList] = useState([]);

	useEffect(() => {
		
		const fetchFeedData = async () => {
			const subscriptions = database.subscriptions
				.where('src', '==', database.users.doc(fire.auth().currentUser.uid)).get();
			const authorRefs = (await subscriptions).docs.map(doc => doc.data().dest);
			if (!authorRefs.length) return;
			console.log(authorRefs);
			const posts = await database.contracts.where('author', 'in', authorRefs).get();

			const feed = [];
			for (let post of posts.docs) {
				const authorSnapshot = await post.data().author.get();
				const authorData = authorSnapshot.data();
				feed.push({
					author: authorData,
					post: post.data(),
				});
			}
			setContractsList(feed);
		}

		fetchFeedData();
	}, []);

	console.log(contractsList);
	return (
		<div className="feed-container">
		{contractsList.length ? contractsList.map(contract => (
			<Post key={contract.id} data={contract} />
		)) : 'No posts'}
		</div>
	);
};

export default Feed;
