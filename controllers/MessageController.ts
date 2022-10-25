import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDaoI from "../interfaces/MessageDaoI";

export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDaoI = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();
      app.post("/users/:uid/following/:tuid", MessageController.messageController.send);
      app.delete("/users/:uid/following/:tuid", MessageController.messageController.deleteReceived);
      app.get("/users/:uid/followers", MessageController.messageController.listSentMessages);
      app.get("/users/:uid/following", MessageController.messageController.listReceivedMessages);
    }
    return MessageController.messageController;
  }

  private constructor() { }

  send = (req: Request, res: Response) =>
    MessageController.messageDao.send(req.params.uid, req.params.tuid, req.params.message).then(result => res.json(result));

  deleteReceived = (req: Request, res: Response) =>
    MessageController.messageDao.deleteReceived(req.params.uid, req.params.mid).then(result => res.json(result));

  listSentMessages = (req: Request, res: Response) =>
    MessageController.messageDao.listSentMessages(req.params.uid).then(result => res.json(result));

  listReceivedMessages = (req: Request, res: Response) =>
    MessageController.messageDao.listReceivedMessages(req.params.uid).then(result => res.json(result));
}