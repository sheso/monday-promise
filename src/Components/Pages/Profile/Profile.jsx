import { useContext, useEffect, useState } from "react";
import { database } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import ProfilePost from "../../Elements/ProfilePost/ProfilePost";
import "../../Elements/ProfilePost/ProfilePost.css";
import { CONTRACT_ACTIVE } from "../../../databaseHandlers";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userContracts, setUserContracts] = useState([]);
  const [points, setPoints] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

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
  }, [forceUpdate, currentUser.displayName, currentUser.uid]);

  useEffect(() => {
    const getPoints = async () => {
      const author = await database.users
        .doc(currentUser.uid)
        .get()
        .then((doc) => doc.data());
      setPoints(author.points ?? 0);
    };
    getPoints();
  }, [forceUpdate, currentUser.uid]);

  return (
    <div className="profile-container py-5">
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
							alt="coin"
            />
          </>
        ) : (
          <h3 style={{ color: "white" }}>0 очков</h3>
        )}
      </div>
      <div className="porfile-container-lk ">
        <h2 className="mt-4">Текущие цели</h2>
        {userContracts.filter((el) => el.post.status === CONTRACT_ACTIVE)
          .length ? (
          userContracts
            .filter((el) => el.post.status === CONTRACT_ACTIVE)
            .map((contract) => (
              <ProfilePost
                key={Math.random()}
                data={contract}
                currentUser={currentUser}
                setForceUpdate={setForceUpdate}
              />
            ))
        ) : (
          <p>Нет текущих обещаний</p>
        )}
        <h2 className="mt-5">Завершенные цели</h2>
        {userContracts.filter((el) => el.post.status !== CONTRACT_ACTIVE).length
          ? userContracts
              .filter((el) => el.post.status !== CONTRACT_ACTIVE)
              .map((contract) => (
                <ProfilePost
                  key={Math.random()}
                  data={contract}
                  currentUser={currentUser}
                  setForceUpdate={setForceUpdate}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default Profile;
