import { Request, Response } from "express";

export default interface MessageControllerI {
  send(req: Request, res: Response): void;
  deleteReceived(req: Request, res: Response): void;
  listSentMessages(req: Request, res: Response): void;
  listReceivedMessages(req: Request, res: Response): void;
};