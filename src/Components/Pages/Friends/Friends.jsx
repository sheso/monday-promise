import { useEffect, useState, useContext } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Friends.css";

const Friends = () => {
  const [peopleList, setPeopleList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // This demands adding REDUX & THUNK
  const [boo, setBoo] = useState(false);
  const currentUserUid = currentUser.uid;

  useEffect(() => {
    const getPeople = database.users.get();

    const getSubscriptions = database.subscriptions
      .where("src", "==", database.users.doc(currentUserUid))
      .get();

    const handlePromises = async () => {
      const [people, subscriptions] = await Promise.all([
        getPeople,
        getSubscriptions,
      ]);
      const subscriptionSet = new Set(
        subscriptions.docs.map((doc) => doc.data().dest.id)
      );

      setPeopleList(
        people.docs.map((doc) => ({
          uid: doc.id,
          doc: doc.data(),
          currentUserIsSubscribed: subscriptionSet.has(doc.id),
        })).sort(el => el.currentUserIsSubscribed ? -1 : 1)
      );
    };

    handlePromises();
  }, [boo, currentUserUid]);

  const subscribe = async (userId) => {
    const subId = [currentUserUid, userId].join(":");
    await database.subscriptions.doc(subId).set({
      src: database.users.doc(currentUser.uid),
      dest: database.users.doc(userId),
    });
    setBoo((pre) => !pre);
  };

  const unsubscribe = async (userId) => {
    const subId = [currentUserUid, userId].join(":");
    await database.subscriptions.doc(subId).delete();
    setBoo((pre) => !pre);
  };

  return (
    <div className="friendsList">
      {peopleList.map((man) => (
        <div key={man.uid} className="firiendCard my-1">
          <span>{man.doc.name}</span>
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

export default Friends
