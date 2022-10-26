import User from "../models/User";

/**
 * An interface that provides common operations that
 * can be done on the users collection.
 */
export default interface UserDaoI {
  findAllUsers(): Promise<User[]>;
  findUserById(uid: string): Promise<any>;
  createUser(user: User): Promise<User>;
  updateUser(uid: string, user: User): Promise<any>;
  deleteUser(uid: string): Promise<any>;
}

