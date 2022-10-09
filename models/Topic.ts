import User from "./User";

export default class Topic {
  private id: string;
  private name: string;
  private postedOn: Date = new Date();
  private postedBy: User | null = null;
  private likesCount: Number = 0;
  constructor(id: string, name: string, postedBy: User) {
    this.id = id;
    this.name = name;
    this.postedBy = postedBy;
  }
}