"user client";

import { getTokenExpiredTime, isTokenExpired } from "./server-utils";

export const sessionTimeOut = async ({ logout }: { logout: () => {} }) => {
  try {
    if (!window.Worker) {
      // check if browser support
      console.log("Your browser doesn't support web workers.");
      return;
    }

    const myWorker = new Worker("http://localhost:4009/workers/sessionTimeOut.js");

    const validity: number = await getTokenExpiredTime();

    if (validity <= 0) {
      await isTokenExpired();
      window.location.reload();
      return;
    }
    myWorker.postMessage(validity);
    console.log("Message posted to worker");

    myWorker.onmessage = function (e) {
      if (e.data.status === true) {
        isTokenExpired();
        logout()
      }
      console.log("Message received from worker", e);
    };
  } catch (error) {
    console.log("🚀 ~ sessionTimeOut ~ error:", error);
  }
};
