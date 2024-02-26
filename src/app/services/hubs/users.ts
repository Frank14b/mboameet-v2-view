import { StoreType } from "@/app/store/userStore";

class UserHubs {
  
  connection: any;
  userStore: StoreType;

  constructor(connection: any, userStore: StoreType) {

    this.connection = connection;
    this.userStore = userStore;

    this.getProfileDetails();
  }

  getProfileDetails(): void {
    this.connection.on("UserProfile", (message: any) => {
      console.log("🚀 ~ connection.on ~ message:", message);
      this.userStore.setUser(message)
    });
  };

  updateProfile = () => {
    if (this.connection) {
      this.connection.invoke("GetProfile");
    }
  };

}

export default UserHubs;
