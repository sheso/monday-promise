import {useEffect, useState} from 'react';
import {fire, database} from '../../../Auth/Fire';
import './Friends.css';

const Friends = () => {
	const [peopleList, setPeopleList] = useState([]);
	
	// This demands adding REDUX & THUNK
	const [boo, setBoo] = useState(false);

	useEffect(() => {
		const getPeople = database.users.get();

		const getSubscriptions = database.subscriptions
			.where('src', '==', database.users.doc(fire.auth().currentUser.uid)).get();

		const handlePromises = async () => {
			const [people, subscriptions] = await Promise.all([getPeople, getSubscriptions]);
			const subscriptionSet = new Set(subscriptions.docs.map(doc => doc.data().dest.id));

			setPeopleList(people.docs.map(doc => ({
				uid: doc.id,
				doc: doc.data(),
				currentUserIsSubscribed: subscriptionSet.has(doc.id),
			})));
		}

		handlePromises();
	}, [boo]);

	const currentUserUid = fire.auth().currentUser.uid

	const subscribe = async (userId) => {
		const subId = [currentUserUid, userId].join(':');
		await database.subscriptions.doc(subId).set({
			src: database.users.doc(fire.auth().currentUser.uid),
			dest: database.users.doc(userId),
		});
		setBoo(pre => !pre);
	}

	const unsubscribe = async (userId) => {
		const subId = [currentUserUid, userId].join(':');
		await database.subscriptions.doc(subId).delete();
		setBoo(pre => !pre);
	}

	return (
		<div>
			{
				peopleList.map(man => (
					<div>
						<span>{man.doc.name}</span>
						{
							man.currentUserIsSubscribed ?
							<button className="unsubscribe-button" onClick={() => unsubscribe(man.uid)}>
								Отписаться
							</button> 
							:
							<button className="subscribe-button" onClick={() => subscribe(man.uid)}>
								Подписаться
							</button> 

						}
						
					</div>
				))
			}
		</div>
	)
}

export default Friends;
