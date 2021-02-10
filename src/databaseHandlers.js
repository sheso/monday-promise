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
  const contractData = await contractRef.get().then((doc) => doc.data());
  console.log("contractData", contractData);
  const contractAuthorID = contractData.author.id;

  console.log("contractAuthorID", contractAuthorID, currentUserId);
  const status = contractData.status;

  if (status !== CONTRACT_ACTIVE || contractAuthorID !== currentUserId) {
    console.log("contract finish fail");
    return;
  }
  await contractRef.update({
    status: CONTRACT_SUCCESS,
  });

  await contractData.author.ref.update();
  console.log("contract finish success");
};

const correctWordForm = (number) => {
  const remainder100 = number % 100;
  const remainder10 = number % 10;
  if (remainder100 >= 5 && remainder100 <= 20) {
    return "дней";
  } else if (remainder10 >= 5 && remainder10 <= 9) {
    return "дней";
  } else if (!remainder10) {
    return "дней";
  } else if (remainder10 >= 2 && remainder10 <= 4) {
    return "дня";
  } else if (remainder10 === 1) {
    return "день";
  }
};

export const setTimer = (startTime, currentTime, endTime) => {
  const duration = Math.floor((endTime - startTime) / 1000);
  const initialRemainingTime = Math.floor((endTime - currentTime) / 1000);
  const remainingDays = Math.floor((endTime - currentTime) / 86400000) + 1;
  const word = correctWordForm(remainingDays);
  return {
    duration,
    initialRemainingTime,
    remainingDays,
    word,
  };
};

export const failIfExpired = async (contract) => {
  const now = new Date();
  const contractExpires = new Date(contract.data().deadline.toDate());
  const authorRef = contract.data().author;

  if (now.getTime() > contractExpires.getTime()) {
    await contract.ref.update({
      status: CONTRACT_FAIL,
    });
    return true;
  }
};
