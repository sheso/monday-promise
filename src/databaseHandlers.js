import { database } from "./Auth/Fire";
export const CONTRACT_ACTIVE = "CONTRACT_ACTIVE";
export const CONTRACT_SUCCESS = "CONTRACT_SUCCESS";
export const CONTRACT_FAIL = "CONTRACT_FAIL";

export const makeBet = async (contractId, currentUserId, userBet) => {
  const betId = [currentUserId, contractId].join(":");
  await database.bets.doc(betId).set({
    user: database.users.doc(currentUserId),
    contract: database.contracts.doc(contractId),
    bet: userBet,
  });
};

export const finishContract = async (contractId, currentUserId) => {
  const contractRef = database.contracts.doc(contractId);
  const contractAuthor = await contractRef
    .get()
    .then((doc) => doc.data().author);
  const contractAuthorID = await contractAuthor.get().then((doc) => doc.id);
  const userId = await database.users
    .doc(currentUserId)
    .get()
    .then((doc) => doc.id);
  const status = await contractRef.get().then((doc) => doc.data().status);

  if (status !== CONTRACT_ACTIVE || contractAuthorID !== userId) {
    console.log("contract finish fail");
    return;
  }
  await contractRef.update({
    status: CONTRACT_SUCCESS,
  });
  console.log("contract finish success");
};

export const setTimer = (startTime, currentTime, endTime) => {
  console.log("times", startTime, currentTime, endTime);

  const duration = Math.floor((endTime - startTime) / 1000);
  const initialRemainingTime = Math.floor((endTime - currentTime) / 1000);
  const remainingDays = Math.floor((endTime - currentTime) / 86400000) + 1;
  // const forms = ["день", "дня", "дней"];
  const fullDays = Math.floor((endTime - startTime) / 86400000) + 1;

  return {
    duration,
    initialRemainingTime,
    remainingDays,
    fullDays,
  };
};

export const like = async (postId, userId) => {
  const likeId = [userId, postId].join(":");
  await database.likes.doc(likeId).set({
    user: database.users.doc(userId),
    post: database.contracts.doc(postId),
  });
};

export const unlike = async (postId, userId) => {
  const likeId = [userId, postId].join(":");
  await database.likes.doc(likeId).delete();
};
