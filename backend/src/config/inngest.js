import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.js";
export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  //hun event contain all data for user created in clerk
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data; //fetch data then create new User
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}` || "User",
      imageUrl: image_url,
      addresses: [],
      wishlist: [],
    };

    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
  //hun event contain all data for user created in clerk
  async ({ event }) => {
    await connectDB();
    const { id } = event.data; //fetch data then create new User
    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
