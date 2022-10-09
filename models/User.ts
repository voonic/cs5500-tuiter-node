import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";

export default class User {
  private id: string;
  private username: string;
  private password: string;
  private firstName: string | null = null;
  private lastName: string | null = null;
  private email: string | null = null;
  private profilePhoto: string | null = null;
  private headerImage: string | null = null;
  private accountType: AccountType = AccountType.Personal;
  private maritalStatus: MaritalStatus = MaritalStatus.Single;
  private biography: string | null = null;
  private dateOfBirth: Date | null = null;
  private joined: Date = new Date();
  private location: Location | null = null;
  private totalFollowers: Number = 0;
  private totalPosts: Number = 0;
  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
