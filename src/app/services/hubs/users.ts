import { StoreType } from "@/app/store/userStore";

class UserHubs {
  
  connection: any;
  userStore: StoreType;

  constructor(connection: any, userStore: StoreType) {

    this.connection = connection;
    this.userStore = userStore;

    this.getProfileDetails();
    this.updateProfile();
  }

  getProfileDetails(): void {
    this.connection.on("UserProfile", (user: any) => {
      if(user?.id) {
        this.userStore.setUserConnected(true);
        this.userStore.setUser(user);
      }
    });
  };

  updateProfile = () => {
    if (this.connection) {
      this.connection.invoke("GetProfile");
    }
  };

}

export default UserHubs;
