import TuitDaoI from "../interfaces/TuitDaoI";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }
  findTuitsByUser(uid: string): Promise<Tuit[]> {
    throw new Error("Method not implemented.");
  }
  findTuitById(tid: string): Promise<Tuit> {
    throw new Error("Method not implemented.");
  }
  createTuit(tuit: Tuit): Promise<Tuit> {
    throw new Error("Method not implemented.");
  }
  updateTuit(tid: string, tuit: Tuit): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteTuit(tid: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}

