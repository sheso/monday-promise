import { database } from "./Auth/Fire";

export const makeBet = async (contractId, currentUserId, userBet) => {
  const betId = [currentUserId, contractId].join(":");
  await database.bets.doc(betId).set({
    user: database.users.doc(currentUserId),
    contract: database.contracts.doc(contractId),
    bet: userBet,
  });
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
