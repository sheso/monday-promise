import { useState, useEffect, useContext } from "react";
import Post from "../../Elements/Post/Post";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import { makeBet, failAllExpired } from "../../../databaseHandlers";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./Feed.css";

const Feed = () => {
  const [contractsList, setContractsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const fetchFeedData = async () => {
      setLoading(true);
      const subscriptions = database.subscriptions
        .where("src", "==", database.users.doc(currentUser.uid))
        .get();
      const authorRefs = (await subscriptions).docs.map(
        (doc) => doc.data().dest
      );
      authorRefs.push(database.users.doc(currentUser.uid));

      const posts = await database.contracts
        .where("author", "in", authorRefs)
        .get();

      const someContractExpired = await failAllExpired(posts.docs);
      if (someContractExpired) {
        setForceUpdate((pre) => !pre);
        return;
      }

      const feed = await Promise.all(
        posts.docs.map(async (post) => {
          const bets = await database.bets
            .where("contract", "==", post.ref)
            .get();
          const authorSnapshot = await post.data().author.get();
          const authorData = authorSnapshot.data();

          const commentsBase = await database.comments
            .where("contractID", "==", post.id)
            .get();
          const test = commentsBase.docs.map((el) => {
            return {
              ...el.data(),
              createdAt: el.data().createdAt.toDate().toLocaleString("ru-RU"),
            };
          });

          return {
            author: authorData,
            post: {
              ...post.data(),
              deadline: post.data().deadline?.toDate(),
              createdAt: post.data().createdAt?.toDate(),
            },
            id: post.id,
            comments: test,
            betsFor: bets.docs.reduce(
              (acc, doc) => (doc.data().bet === true ? (acc += 1) : acc),
              0
            ),
            betsAgainst: bets.docs.reduce(
              (acc, doc) => (doc.data().bet === false ? (acc += 1) : acc),
              0
            ),
            userMadeBet: bets.docs
              .find((doc) => doc.data().user.id === currentUser.uid)
              ?.data().bet,
          };
        })
      );

      feed.sort(
        (docA, docB) =>
          docB.post.createdAt.getTime() - docA.post.createdAt.getTime()
      );
      setContractsList(feed);
      setLoading(false);
    };

    fetchFeedData();
  }, [currentUser.uid, forceUpdate]);

  const makeUserBet = async (post, user, bet) => {
    await makeBet(post, user, bet);
    setForceUpdate((pre) => !pre);
  };

  return (
    <div className="feed-container py-3">
      <h1>Лента обещаний</h1>
      {contractsList.length ? (
        contractsList.map((contract) => (
          <Post
            key={contract.id}
            data={contract}
            makeBet={makeUserBet}
            currentUser={currentUser}
            setForceUpdate={setForceUpdate}
          />
        ))
      ) : loading ? (
        <img
          src="../../../images/11210f3927a5c230f28ec52b609192-unscreen.gif"
          width="20%"
          style={{ margin: "0 auto" }}
        />
      ) : (
        <div className="empty-feed-container">
          <div className="block">
            <h3>Похоже, вы еще не добавили ни одного обещания.</h3>
            <p>Начнем понедельник сегодня? </p>
            <button className="button">
              <Link to="/contract/new">Добавить новую цель</Link>
            </button>
          </div>
          <div className="block">
            <h3>В вашей ленте так одиноко...</h3>
            <p>Давайте добавим кого-нибудь интересного!</p>
            <button className="button">
              <Link to="/friends">Найти друзей</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
