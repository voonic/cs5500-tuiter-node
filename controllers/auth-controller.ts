import UserDao from "../daos/UserDao";
import { Express, Request, Response } from "express";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {

  const userDao: UserDao = new UserDao();

  const signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

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
  app.post("/auth/signup", signup);
}

export default AuthenticationController;