import UserDao from "../daos/UserDao";
import { Express, Request, Response } from "express";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * An authentication controller that provides
 * methods to register, login and logout users.
 * 
 * @param app The express app on which the controller will run.
 */
const AuthenticationController = (app: Express) => {

  const userDao: UserDao = new UserDao();

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  const signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    console.log(newUser);
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;
    newUser.profilePhoto = "nasa.png";
    const existingUser = await userDao
      .findUserByUsername(req.body.username);
    if (existingUser) {
      res.sendStatus(403);
      return;
    } else {
      const insertedUser = await userDao
        .createUser(newUser);
      insertedUser.password = '';
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  /**
   * Responsible for getting the profile of the user.
   * If user is not logged in then returns unauthorized error.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  const profile = (req: Request, res: Response) => {
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }

  /**
   * Responsible for loggin out the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   */
  const logout = (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    res.sendStatus(200);
  }

  /**
   * Responsible for sign in the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Existing  user to the frontend.
   */
  const login = async (req: Request, res: Response) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
      .findUserByUsername(username);

    if (!existingUser) {
      res.sendStatus(403);
      return;
    }

    const match = await bcrypt
      .compare(password, existingUser.password);

    if (match) {
      existingUser.password = '*****';
      //@ts-ignore
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };

  app.post("/auth/login", login);
  app.post("/auth/signup", signup);
  app.post("/auth/profile", profile);
  app.post("/auth/logout", logout);
}

export default AuthenticationController;