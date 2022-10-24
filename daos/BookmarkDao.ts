import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmarks from "../models/Bookmarks";

export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;

  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }
  private constructor() { }

  createBookmark(uid: String, tid: string): Promise<Bookmarks> {
    throw new Error("Method not implemented.");
  }

  deleteBookmark(uid: String, tid: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  listBookmarks(uid: String): Promise<Bookmarks[]> {
    throw new Error("Method not implemented.");
  }
}