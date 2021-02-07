import { useState, useEffect, useContext } from 'react';
import Post from '../../Elements/Post/Post';
import { database} from '../../../Auth/Fire';
import { AuthContext } from '../../../Context/AuthContext';
import './Feed.css';

const Feed = () => {
	const [contractsList, setContractsList] = useState([]);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		
		const fetchFeedData = async () => {
			const subscriptions = database.subscriptions
				.where('src', '==', database.users.doc(currentUser.uid)).get();
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
					id: post.id,
				});
			}
			setContractsList(feed);
		}

		fetchFeedData();
	}, [currentUser.uid]);

	console.log('my feed posts:', contractsList);
	return (
		<div className="feed-container">
		{contractsList.length ? contractsList.map(contract => (
			<Post key={contract.id} data={contract} />
		)) : 'No posts'}
		</div>
	);
};

export default Feed;
