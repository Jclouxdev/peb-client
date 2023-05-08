interface IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  avatarUrl: string;
  creationDate: string;
}
export default IUser;
