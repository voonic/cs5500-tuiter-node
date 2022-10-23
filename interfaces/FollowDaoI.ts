import Follow from "../models/Follow";
import User from "../models/User";

export default interface FollowDaoI {
  followUser(uid: String, tuid: string): Promise<Follow>;
  unfollowUser(uid: String, tuid: string): Promise<any>;
  listUserFollowers(uid: String): Promise<User[]>;
  listUserFollowings(uid: String): Promise<User[]>;
};