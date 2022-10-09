import { Request, Response, Express } from "express";
import TuitControllerI from "../interfaces/TuitControllerI";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDaoI;
  constructor(app: Express, tuitDao: TuitDaoI) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get('/tuits', this.findAllTuits);
    this.app.get('/tuits/:tid', this.findTuitById);
    this.app.get('/users/:uid/tuits', this.findTuitsByUser);
    this.app.post('/tuits', this.createTuit);
    this.app.put('/tuits/:tid', this.updateTuit);
    this.app.delete('/tuits/:tid', this.deleteTuit);
  }

  findAllTuits = (req: Request, res: Response) => this.tuitDao.findAllTuits().then(tuits => res.json(tuits));

  findTuitById = (req: Request, res: Response) => this.tuitDao.findTuitById(req.params.tuitid).then(tuit => res.json(tuit));

  findTuitsByUser = (req: Request, res: Response) => this.tuitDao.findTuitsByUser(req.params.userid).then(tuits => res.json(tuits));

  createTuit = (req: Request, res: Response) => this.tuitDao.createTuit(req.body).then(tuit => res.json(tuit));

  updateTuit = (req: Request, res: Response) => this.tuitDao.updateTuit(req.params.tuitid, req.body).then(tuit => res.json(tuit));

  deleteTuit = (req: Request, res: Response) => this.tuitDao.deleteTuit(req.params.tuitid).then(tuit => res.json(tuit));

}