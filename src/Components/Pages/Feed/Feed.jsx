import { useState, useEffect, useContext } from "react";
import Post from "../../Elements/Post/Post";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
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
        const likes = await database.likes.where("post", "==", post.ref).get();
        const authorSnapshot = await post.data().author.get();
        const authorData = authorSnapshot.data();
        feed.push({
          author: authorData,
          post: post.data(),
          id: post.id,
          likes: likes.docs.length,
          userLiked: likes.docs.some(
            (doc) => doc.data().user.id === currentUser.uid
          ),
        });
      }
      setContractsList(feed);
    };

    fetchFeedData();
  }, [currentUser.uid]);

  const like = async (postId) => {
    const likeId = [currentUser.uid, postId].join(":");
    await database.likes.doc(likeId).set({
      user: database.users.doc(currentUser.uid),
      post: database.contracts.doc(postId),
    });
  };

  const unlike = async (postId) => {
    const likeId = [currentUser.uid, postId].join(":");
    await database.likes.doc(likeId).delete();
  };

  console.log("my feed posts:", contractsList);
  return (
    <div className="feed-container">
      {contractsList.length ? (
        contractsList.map((contract) => (
          <Post key={contract.id} data={contract} like={like} unlike={unlike} />
        ))
      ) : (
        <img
          src="../../../images/11210f3927a5c230f28ec52b609192-unscreen.gif"
          width="40%"
        />
      )}
    </div>
  );
};

export default Feed;
