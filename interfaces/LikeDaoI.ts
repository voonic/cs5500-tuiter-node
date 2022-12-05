import Like from "../models/Likes";
import Tuit from "../models/Tuit";

/**
 * An interface that provides common operations that
 * can be done on the likes collection.
 */
export default interface LikeDaoI {
  findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
  findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
  findAllTuitsDislikedByUser(uid: string): Promise<Like[]>;
  userTogglesLike(tid: string, uid: string): Promise<any>;
  userTogglesDislike(tid: string, uid: string): Promise<any>;
  getTuitLikedObject(tid: string, uid: string): Promise<Like | null>;
};