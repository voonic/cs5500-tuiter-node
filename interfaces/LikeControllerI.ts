import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to Like Tuit CRUD operations.
 */
export default interface LikeControllerI {
  findAllUsersThatLikedTuit(req: Request, res: Response): void;
  findAllTuitsLikedByUser(req: Request, res: Response): void;
  userTogglesLike(req: Request, res: Response): void;
  userTogglesDislike(req: Request, res: Response): void;
  getTuitLikedObject(req: Request, res: Response): void;
};