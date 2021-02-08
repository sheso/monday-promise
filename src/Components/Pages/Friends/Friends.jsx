import { useEffect, useState, useContext } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Friends.css";

const Friends = () => {
  const [peopleList, setPeopleList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const currentUserUid = currentUser.uid;

  useEffect(() => {
		database.subscriptions.where("src", "==", database.users.doc(currentUserUid))
    	.onSnapshot((querySnapshot) => {
				let subsSet = new Set(querySnapshot.docs.map(el => el.data().dest.id));

				database.users
					.onSnapshot((querySnapshot) => {
						setPeopleList(querySnapshot.docs.map((doc) => ({
							uid: doc.id,
							doc: doc.data(),
							currentUserIsSubscribed: subsSet.size ? subsSet.has(doc.id) : false,
						})).sort(el => el.currentUserIsSubscribed ? -1 : 1));
				});	
    });
  }, []);

  const subscribe = async (userId) => {
    const subId = [currentUserUid, userId].join(":");
    await database.subscriptions.doc(subId).set({
      src: database.users.doc(currentUser.uid),
      dest: database.users.doc(userId),
    });
  };

  const unsubscribe = async (userId) => {
    const subId = [currentUserUid, userId].join(":");
    await database.subscriptions.doc(subId).delete();
  };

  return (
    <div className="friendsList">
      {peopleList.map((man) => (
        <div key={man.uid} className="firiendCard my-1">
          <span>{man.doc.name}</span>
          <img
            src="http://pm1.narvii.com/6679/56c3426ed18147d4a02c1c34200959087612982e_00.jpg"
            width="40%"
          />
          {man.currentUserIsSubscribed ? (
            <button
              className="unsubscribe-button"
              onClick={() => unsubscribe(man.uid)}
            >
              Отписаться
            </button>
          ) : (
            <button
              className="subscribe-button"
              onClick={() => subscribe(man.uid)}
            >
              Подписаться
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Friends;
