import { hubConstants } from "@/app/lib/constants/hubs";
import { StoreType } from "@/app/store/userStore";

class UserHubs {
  
  connection: signalR.HubConnection;
  userStore: StoreType;

  constructor(connection: signalR.HubConnection, userStore: StoreType) {

    this.connection = connection;
    this.userStore = userStore;

    this.getProfileDetails();
    this.updateProfile();
  }

  getProfileDetails(): void {
    this.connection.on(hubConstants.users.profile, (user: any) => {
      if(user?.id) {
        this.userStore.setUserConnected(true);
        this.userStore.setUser(user);
      }
    });
  };

  updateProfile = () => {
    if (this.connection) {
      this.connection.invoke(hubConstants.users.getProfile);
    }
  };
}

export default UserHubs;
