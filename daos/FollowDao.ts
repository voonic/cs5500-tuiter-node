import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import User from "../models/User";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;

  public static getInstance = (): FollowDao => {
    if (FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  }
  private constructor() { }

  followUser = async (uid: String, tuid: string): Promise<Follow> => {
    return await FollowModel.create({ follower: uid, following: tuid });
  }

  unfollowUser = async (uid: String, tuid: string): Promise<any> => {
    return await FollowModel.deleteOne({ follower: uid, following: tuid });
  }

  listUserFollowers(uid: String): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  listUserFollowings(uid: String): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}