import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDaoI from "../interfaces/FollowDaoI";

export default class FollowController implements FollowControllerI {
  private static followDao: FollowDaoI = FollowDao.getInstance();
  private static followController: FollowController | null = null;

  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.post("/users/:uid/following/:tuid", FollowController.followController.followUser);
      app.delete("/users/:uid/following/:tuid", FollowController.followController.unfollowUser);
      app.get("/users/:uid/followers", FollowController.followController.listUserFollowers);
      app.get("/users/:uid/following", FollowController.followController.listUserFollowings);
    }
    return FollowController.followController;
  }

  private constructor() { }

  followUser = (req: Request, res: Response) =>
    FollowController.followDao.followUser(req.params.uid, req.params.tuid).then(result => res.json(result));

  unfollowUser = (req: Request, res: Response) =>
    FollowController.followDao.unfollowUser(req.params.uid, req.params.tuid).then(result => res.json(result));

  listUserFollowers = (req: Request, res: Response) =>
    FollowController.followDao.listUserFollowers(req.params.uid).then(result => res.json(result));

  listUserFollowings = (req: Request, res: Response) =>
    FollowController.followDao.listUserFollowings(req.params.uid).then(result => res.json(result));
}