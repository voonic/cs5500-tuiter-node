import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Likes";
import LikeModel from "../mongoose/LikeModel";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class The class which is responsible for CRUD operations
 * for the likes model.
 * 
 * @property {LikeDao} likeDao Singleton DAO implementing likes 
 * CRUD operations
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;

  /**
   * Creates singleton dao instance.
   * 
   * @return FollowDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  }
  private constructor() { }

  /**
   * Finds all the users who liked a specific tuit.
   * 
   * @param tid The tuit id for which users needs to fetched.
   * @returns The array of like objects populated with user object.
   * 
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel
      .find({ tuit: tid })
      .populate("likedBy")
      .exec();

  /**
   * Find all the tuits that is liked by a user.
   * 
   * @param uid The userid for which the all tuits needs to be fetched.
   * @returns Array of like object populated with tuit object.
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel
      .find({ likedBy: uid })
      .populate("tuit")
      .exec();

  /**
   * Find if this tuit is liked or disliked by user.
   * 
   * @param uid The userid for which like entry is fetched
   * @returns Like object
   */
  getTuitLikedObject = async (tid: string, uid: string): Promise<Like | null> => LikeModel.findOne({ tuit: tid, likedBy: uid });

  /**
   * A toggle behaviour for liking a tuit.
   * When it is liked it will add user in likes collection for that tuit.
   * If liked again then it will delete that.
   * @param tid The user who is toggling like for the tuit.
   * @param uid The tuit id that is being like/unliked.
   */
  userTogglesLike = async (tid: string, uid: string): Promise<any> => {
    let likeData = await LikeModel.findOne({ tuit: tid, likedBy: uid });
    let state = "";
    if (likeData) {
      // If likeData existed, it can be either like or dislike
      // then check its of what type and update accordingly.
      if (likeData.type) {
        // It means user liked it already, then delete this entry
        await Promise.all([
          likeData.delete(),
          TuitModel.updateOne({ _id: tid }, { $inc: { likes: -1 } }),
        ]);
      } else {
        // It means user disliked it already, now it want to change it to like.
        state = "liked";
        await Promise.all([
          likeData.update({ type: true }),
          TuitModel.updateOne({ _id: tid }, { $inc: { likes: 1, dislikes: -1 } }),
        ]);
      }
    } else {
      state = "liked";
      await Promise.all([
        LikeModel.create({ tuit: tid, likedBy: uid, type: true }),
        TuitModel.updateOne({ _id: tid }, { $inc: { likes: 1 } }),
      ]);
    }
    const tuit = await TuitModel.findById(tid);
    return {
      state: state,
      likes: tuit?.likes,
      dislikes: tuit?.dislikes,
    }
  }

  /**
   * A toggle behaviour for disliking a tuit.
   * When it is disliked it will add user in likes collection for that tuit.
   * If disliked again then it will delete that.
   * @param tid The user who is toggling dislike for the tuit.
   * @param uid The tuit id that is being dislike/undisliked.
   */
  userTogglesDislike = async (tid: string, uid: string): Promise<any> => {
    let likeData = await LikeModel.findOne({ tuit: tid, likedBy: uid });
    let state = "";
    if (likeData) {
      // If likeData existed, it can be either like or dislike
      // then check its of what type and update accordingly.
      if (!likeData.type) {
        // It means user disliked it already, then delete this entry
        await Promise.all([
          likeData.delete(),
          TuitModel.updateOne({ _id: tid }, { $inc: { dislikes: -1 } }),
        ]);
      } else {
        // It means user liked it already, now it want to change it to dislike.
        state = "disliked";
        await Promise.all([
          likeData.update({ type: false }),
          TuitModel.updateOne({ _id: tid }, { $inc: { likes: -1, dislikes: 1 } }),
        ]);
      }
    } else {
      state = "disliked";
      await Promise.all([
        LikeModel.create({ tuit: tid, likedBy: uid, type: false }),
        TuitModel.updateOne({ _id: tid }, { $inc: { dislikes: 1 } }),
      ]);
    }
    const tuit = await TuitModel.findById(tid);
    return {
      state: state,
      likes: tuit?.likes,
      dislikes: tuit?.dislikes,
    }
  }
}