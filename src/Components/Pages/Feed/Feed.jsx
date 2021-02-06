import { useState, useEffect } from 'react';
import Post from '../../Elements/Post/Post';
import {database} from '../../../Auth/Fire';
import './Feed.css';

const Feed = () => {
	const [promiseList, setPromiseList] = useState([]);

	useEffect(() => {
		const promises = database.promises.get().then((res) => {
			setPromiseList(res.docs.map(doc => {
				const { title, description, deadline, done } = doc.data();
				return {title, description, deadline, done}
			}))
		});
	}, []);

	console.log(promiseList);
	return (
		<div className="feed-container">
		{promiseList.map(promise => (
			<Post data={promise} />
		))}
		</div>
	);
};

export default Feed;
