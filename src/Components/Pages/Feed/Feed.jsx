import { useState, useEffect, useContext } from "react";
import Post from "../../Elements/Post/Post";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import { makeBet } from "../../../databaseHandlers";
import "./Feed.css";

const Feed = () => {
  const [contractsList, setContractsList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeedData = async () => {
      const subscriptions = database.subscriptions
        .where("src", "==", database.users.doc(currentUser.uid))
        .get();
      const authorRefs = (await subscriptions).docs.map(
        (doc) => doc.data().dest
      );
      if (!authorRefs.length) return;
      console.log(authorRefs);
      const posts = await database.contracts
        .where("author", "in", authorRefs)
        .get();

      const feed = [];
      for (let post of posts.docs) {
        const bets = await database.bets
          .where("contract", "==", post.ref)
          .get();
        const authorSnapshot = await post.data().author.get();
        const authorData = authorSnapshot.data();
        feed.push({
          author: authorData,
          post: post.data(),
          id: post.id,
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
        });
      }
      setContractsList(feed);
    };

    fetchFeedData();
  }, [currentUser.uid]);
  


  console.log("my feed posts:", contractsList);
  return (
    <div className="feed-container">
      {contractsList.length ? (
        contractsList.map((contract) => (
          <Post
            key={contract.id}
            data={contract}
            makeBet={makeBet}
            currentUser={currentUser}
          />
        ))
      ) : (
        <img
          src="../../../images/11210f3927a5c230f28ec52b609192-unscreen.gif"
          width="50%"
          style={{ margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default Feed;
