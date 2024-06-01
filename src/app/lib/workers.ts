"user client";

import { getTokenExpiredTime, isTokenExpired } from "./server-utils";

export const sessionTimeOut = async ({ logout }: { logout: () => {} }) => {
  try {
    if (!window.Worker) {
      // check if browser support
      console.log("Your browser doesn't support web workers.");
      return;
    }

    const myWorker = new SharedWorker("./workers/sessionTimeOut.js", { name: 'user-session' });
    myWorker.port.start();

    const validity: number = await getTokenExpiredTime();

    if (validity <= 0) {
      await isTokenExpired();
      window.location.reload();
      return;
    }

    myWorker.port.postMessage(validity);

    myWorker.port.onmessage = function (e) {
      if (e.data.status === true) {
        isTokenExpired();
        logout()
      }
    };
  } catch (error) {
    console.log("🚀 ~ sessionTimeOut ~ error:", error);
  }
};
