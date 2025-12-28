import { Usuario } from "./usuario";
import { Troca } from "./troca";

export class Message {
  id!: number;
  content!: string;
  timestamp!: string;
  readDate?: string;
  remetente!: Usuario;
  troca!: Troca;
}
