import Bookmarks from "../models/Bookmarks";

export default interface BookmarkDaoI {
  createBookmark(uid: String, tid: string): Promise<Bookmarks>;
  deleteBookmark(uid: String, tid: string): Promise<any>;
  listBookmarks(uid: String): Promise<Bookmarks[]>;
};