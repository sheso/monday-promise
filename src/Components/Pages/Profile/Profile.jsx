import { useContext, useEffect, useState } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import Post from "../../Elements/Post/Post";
import ProfilePost from "../../Elements/ProfilePost/ProfilePost";
import Feed from "../Feed/Feed";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../../Elements/ProfilePost/ProfilePost.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userContracts, setUserContracts] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const userPosts = async () => {
      const posts = await database.contracts
        .where("author", "==", database.users.doc(currentUser.uid))
        .get();
      const result = posts.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      const testArr = [];
      const author = currentUser.displayName;
      for (let res of result) {
        testArr.push({
          author,
          post: {
            title: res.title,
            description: res.description,
            deadline: res.deadline.toDate(),
            status: res.status,
            createdAt: res.createdAt,
          },
          id: res.id,
        });
      }
      setUserContracts(testArr);
    };
    userPosts();
  }, []);

  console.log(userContracts, "contracts");

  useEffect(() => {
    const getPoints = async () => {
      const author = await database.users
        .doc(currentUser.uid)
        .get()
        .then((doc) => doc.data());
      setPoints(author.points);
    };
    getPoints();
  }, []);

  return (
    <div className="profile-container">
      <h2 style={{ color: "white", textAlign: "center" }}>
        Привет, {currentUser.displayName}!
      </h2>
      <div className="points py-2 px-2">
        {points ? (
          <>
            <h3 style={{ color: "white" }}>У тебя {points}</h3>
            <img
              src="https://img.icons8.com/cotton/2x/dollar-coin.png"
              width="30vw"
            />
          </>
        ) : (
          <h3 style={{ color: "white" }}>У тебя 0</h3>
        )}
      </div>
      <div className="porfile-container-lk ">
        {userContracts.length ? (
          userContracts.map((contract) => (
            <ProfilePost
              key={Math.random()}
              data={contract}
              currentUser={currentUser}
            />
          ))
        ) : (
          // <img
          //   src="../../../images/11210f3927a5c230f28ec52b609192-unscreen.gif"
          //   width="10%"
          //   style={{ margin: '0 auto' }}
          // />
          <div>
            <h5>Вы пока не дали не одного обещания.</h5>
            <Link to="/contract/new">Дать обещание</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
