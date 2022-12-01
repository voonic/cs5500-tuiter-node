import Tuit from "./Tuit";
import User from "./User";

/**
 * Like Represents likes relationship between a user and a tuit,
 * as in a user likes/dislikes a tuit.
 * 
 * @property {Tuit} tuit Tuit being liked/disliked
 * @property {User} likedBy User liking/disliking the tuit
 * @property {Boolean} type If true it means its a like, if false its a dislike.
 * 
 * @see User
 */
export default interface Like {
  tuit: Tuit,
  likedBy: User
  type: Boolean,
};