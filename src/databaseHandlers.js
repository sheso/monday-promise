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
