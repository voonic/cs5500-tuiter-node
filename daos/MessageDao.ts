import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }
  private constructor() { }

  deleteReceived = async (uid: String, mid: String): Promise<any> => {
    return await MessageModel.deleteOne({ to: uid, _id: mid });
  }

  send = async (uid: String, tuid: string, message: String): Promise<Message> => {
    return await MessageModel.create({ to: tuid, from: uid, message: message, sentOn: new Date() });
  }
  listSentMessages = async (uid: String): Promise<Message[]> => {
    return await MessageModel.find({ from: uid }).populate("to");
  }
  listReceivedMessages = async (uid: String): Promise<Message[]> => {
    return await MessageModel.find({ to: uid }).populate("from");
  }
}