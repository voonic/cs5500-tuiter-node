import Message from "../models/Message";

export default interface MessageDaoI {
  send(uid: String, tuid: string, message: String): Promise<Message>;
  listSentMessages(uid: String): Promise<Message[]>;
  listReceivedMessages(uid: String): Promise<Message[]>;
};