import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDaoI = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;

  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.post("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.createBookmark);
      app.delete("/users/:uid/following/:tuid", BookmarkController.bookmarkController.deleteBookmark);
      app.get("/users/:uid/followers", BookmarkController.bookmarkController.listBookmarks);
    }
    return BookmarkController.bookmarkController;
  }

  createBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.createBookmark(req.params.uid, req.params.tid).then(result => res.json(result));

  deleteBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.deleteBookmark(req.params.uid, req.params.tid).then(result => res.json(result));

  listBookmarks = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.listBookmarks(req.params.uid).then(result => res.json(result));

}