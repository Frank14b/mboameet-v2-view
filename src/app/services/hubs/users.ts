import { hubConstants } from "@/app/lib/constants/hubs";
import { StoreType } from "@/app/store/userStore";

class UserHubs {
  connection: signalR.HubConnection;
  userStore: StoreType;
  getFileUrl: (
    link?: string | undefined,
    userId?: number | undefined
  ) => string

  constructor(
    connection: signalR.HubConnection,
    userStore: StoreType,
    getFileUrl: (
      link?: string | undefined,
      userId?: number | undefined
    ) => string
  ) {
    this.connection = connection;
    this.userStore = userStore;
    this.getFileUrl = getFileUrl;

    this.init();
  }

  init(): void {
    this.connection.on(hubConstants.users.profile, (user: any) => {
      if (user?.id) {
        this.userStore.setUserConnected(true);
        this.userStore.setUser({
          ...user,
          photo: this.getFileUrl(user.photo, user.id),
        });
      }
    });
  }

  updateProfile = () => {
    if (this.connection) {
      this.connection.invoke(hubConstants.users.getProfile);
    }
  };
}

export default UserHubs;
