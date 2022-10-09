import Tag from "./Tag";
import User from "./User";

export default class Tuit {
  private id: string;
  private tuit: string = '';
  private postedOn: Date = new Date();
  private postedBy: User | null = null;
  private likesCount: Number = 0;
  private tags: Array<Tag> = [];
  constructor(id: string, postedBy: User) {
    this.id = id;
    this.postedBy = postedBy;
  }
}
