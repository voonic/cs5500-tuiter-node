import User from "./User";

/**
 * A tuit model that defines a tuit posted by the user.
 * Users can post as many tuits as they want.
 * 
 * @property {String} tuit The name of the topic.
 * @property {Date} postedOn The date on which it was first posted on.
 * @property {User} postedBy The user who has created this topic.
 * @property {Number} likes The total likes count till date.
 * @property {Number} replies The total replies count till date.
 * @property {Number} retuits The total retuits count till date.
 * 
 * @see User
 */
export default interface Tuit {
  tuit: string;
  postedOn: Date;
  postedBy: User;
  likes: Number;
  dislikes: Number;
  replies: Number;
  retuits: Number;
}
