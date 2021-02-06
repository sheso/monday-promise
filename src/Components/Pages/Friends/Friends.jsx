import {useEffect, useState} from 'react';
import {fire, database} from '../../../Auth/Fire';

const Friends = () => {
	const [peopleList, setPeopleList] = useState([]);

	useEffect(() => {
		const getPeople = database.users.get();

		console.log('user-ref', database.users.doc(fire.auth().currentUser.uid));
		const getSubscriptions = database.subscriptions
			.where('src', '==', database.users.doc(fire.auth().currentUser.uid)).get();

		const handlePromises = async () => {
			const [people, subscriptions] = await Promise.all([getPeople, getSubscriptions]);
			const subscriptionSet = new Set(subscriptions.docs.map(doc => doc.data().dest.id));

			console.log('subs', subscriptions.docs);
			console.log('set', subscriptionSet);

			setPeopleList(people.docs.map(doc => ({
				uid: doc.id,
				doc: doc.data(),
				currentUserIsSubscribed: subscriptionSet.has(doc.id),
			})));
		}

		handlePromises();
	}, []);

	const subscribe = async (userId) => {
		console.log(userId);
		const subId = [fire.auth().currentUser.uid, userId].join(':');
		await database.subscriptions.doc(subId).set({
			src: database.users.doc(fire.auth().currentUser.uid),
			dest: database.users.doc(userId),
		});
	}

	return (
		<div>
			{
				peopleList.map(man => (
					<div>
						<span>{man.doc.name}</span>
						<button disabled={man.currentUserIsSubscribed} onClick={() => subscribe(man.uid)}>Подписаться</button>
					</div>
				))
			}
		</div>
	)
}

export default Friends;
