import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmarks from "../models/Bookmarks";
import BookmarkModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;

  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }
  private constructor() { }

  createBookmark = async (uid: String, tid: String): Promise<Bookmarks> => {
    return await BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid });
  }

  deleteBookmark = async (uid: String, tid: String): Promise<any> => {
    return await BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid });
  }

  listBookmarks = async (uid: String): Promise<Bookmarks[]> => {
    return await BookmarkModel.find({ bookmarkedBy: uid });
  }
}