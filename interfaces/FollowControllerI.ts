import { Request, Response } from "express";

export default interface FollowControllerI {
  followUser(req: Request, res: Response): void;
  unfollowUser(req: Request, res: Response): void;
  listUserFollowers(req: Request, res: Response): void;
  listUserFollowings(req: Request, res: Response): void;
};