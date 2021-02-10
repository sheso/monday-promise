import { useEffect, useState, useContext } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Friends.css";

const Friends = () => {
  const [peopleList, setPeopleList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const currentUserUid = currentUser.uid;

  useEffect(() => {
    database.subscriptions
      .where("src", "==", database.users.doc(currentUserUid))
      .onSnapshot((querySnapshot) => {
        let subsSet = new Set(
          querySnapshot.docs.map((el) => el.data().dest.id)
        );

        database.users.onSnapshot((querySnapshot) => {
          setPeopleList(
            querySnapshot.docs
              .map((doc) => ({
                uid: doc.id,
                doc: doc.data(),
                currentUserIsSubscribed: subsSet.size
                  ? subsSet.has(doc.id)
                  : false,
              }))
              .sort((el) => (el.currentUserIsSubscribed ? -1 : 1))
          );
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
        <div key={man.uid} className="card firiends my-2">
          {man.doc.photoURL ? (
            <img src={man.doc.photoURL} className="card-img-top" />
          ) : (
            <img src="https://img.icons8.com/ios/452/promise.png" />
          )}
          <div className="card-body">
            <span className="card-title">{man.doc.name}</span>
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
        </div>
      ))}
    </div>
  );
};

export default Friends;
