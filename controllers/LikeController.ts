import { Express, Request, Response } from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDaoI from "../interfaces/LikeDaoI";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *      <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *      <li>GET /api/users/:uid/likesdata/:tid to retrieve like object by loggedin user.
 *     </li>
 *    <li>POST /api/users/:uid/togglelikes/:tid to record that a user toggles likes for a tuit
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
  private static likeDao: LikeDaoI = LikeDao.getInstance();
  private static likeController: LikeController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): LikeController => {
    if (LikeController.likeController === null) {
      LikeController.likeController = new LikeController();
      app.get("/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
      app.get("/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser);
      app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
      app.get("/users/:uid/likedata/:tid", LikeController.likeController.getTuitLikedObject);
      app.post("/users/:uid/togglelikes/:tid", LikeController.likeController.userTogglesLike);
      app.post("/users/:uid/toggledislikes/:tid", LikeController.likeController.userTogglesDislike);
    }
    return LikeController.likeController;
  }

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor() { }

  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatLikedTuit = (req: Request, res: Response) =>
    LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
      .then(likes => res.json(likes));

  /**
   * Retrieves all tuits liked by a user from the database.
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsLikedByUser = (req: Request, res: Response) =>
    LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
      .then(likes => res.json(likes));


  /**
   * Retrieves all tuits disliked by a user from the database.
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsDislikedByUser = (req: Request, res: Response) =>
    LikeController.likeDao.findAllTuitsDislikedByUser(req.params.uid)
      .then(likes => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is toggling likes for the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userTogglesLike = (req: Request, res: Response) =>
    LikeController.likeDao.userTogglesLike(req.params.tid, req.params.uid)
      .then(likes => res.json(likes));

  /**
  * @param {Request} req Represents request from client, including the
  * path parameters uid and tid representing the user that is toggling likes for the tuit
  * and the tuit being liked
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON containing the new likes that was inserted in the
  * database
  */
  userTogglesDislike = (req: Request, res: Response) =>
    LikeController.likeDao.userTogglesDislike(req.params.tid, req.params.uid)
      .then(likes => res.json(likes));

  /**
  * Fetches whether user liked or disliked this tuit.
  *  
  * @param {Request} req Represents request from client, including the
  * path parameters uid and tid representing the user that is toggling likes for the tuit
  * and the tuit being liked
  * @param {Response} res Represents response to client, including the
  * body formatted as JSON containing the new likes that was inserted in the
  * database
  */
  getTuitLikedObject = (req: Request, res: Response) =>
    LikeController.likeDao.getTuitLikedObject(req.params.tid, req.params.uid)
      .then(result => res.json(result));
};