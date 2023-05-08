import { UUID } from "crypto";
import IUser from "./IUser";

interface IMarker {
  categorie: { id: number; name: string };
  id: UUID;
  name: string;
  lat: string;
  lon: string;
  description: string;
  users: IUser[];
}

export default IMarker;
