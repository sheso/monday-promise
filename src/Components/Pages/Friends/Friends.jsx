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
                points: doc.data().points ?? 0,
                currentUserIsSubscribed: subsSet.size
                  ? subsSet.has(doc.id)
                  : false,
              }))
              .sort((el) => (el.currentUserIsSubscribed ? -1 : 1))
              .filter((el) => el.uid !== currentUserUid)
          );
        });
      });
  }, [currentUserUid]);

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
      <h2>Друзья</h2>
      {peopleList.filter((user) => user.currentUserIsSubscribed).length ? (
        peopleList
          .filter((user) => user.currentUserIsSubscribed)
          .sort((userA, userB) => userB.points - userA.points)
          .map((man) => (
            <div key={man.uid} className="card firiends my-2">
              {man.doc.photoURL ? (
                <img
                  src={man.doc.photoURL}
                  className="card-img-top"
                  alt="userpic"
                />
              ) : (
                <img src="../../../images/promise-ava.png" alt="userpic" />
              )}
              <div className="card-body">
                <span className="card-title">{man.doc.name}</span>
                <div className="card-end">
                  <div className="points">
                    <span>{man.points}</span>
                    <img
                      className="coin-img "
                      src="https://img.icons8.com/cotton/2x/dollar-coin.png"
											alt="Coins"
                    />
                  </div>
                  <button
                    className="unsubscribe-button"
                    onClick={() => unsubscribe(man.uid)}
                  >
                    Отписаться
                  </button>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>Вы пока ни на кого не подписаны</p>
      )}
      <hr />
      <h4>Другие пользователи</h4>
      {peopleList
        .filter((user) => !user.currentUserIsSubscribed)
        .sort((userA, userB) => userB.points - userA.points)
        .map((man) => (
          <div key={man.uid} className="card firiends my-2">
            {man.doc.photoURL ? (
              <img
                src={man.doc.photoURL}
                className="card-img-top"
                alt="userpic"
              />
            ) : (
              <img
                src="https://img.icons8.com/ios/452/promise.png"
                alt="userpic"
              />
            )}
            <div className="card-body">
              <span className="card-title">{man.doc.name}</span>
              <button
                className="subscribe-button"
                onClick={() => subscribe(man.uid)}
              >
                Подписаться
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Friends;
