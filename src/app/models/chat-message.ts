import { Usuario } from "./usuario";

export class ChatMessage {
  id!: number;
  remetente!: Usuario;
  destinatario!: Usuario;
  conteudo!: string;
  enviadaEm!: string;
  lida!: boolean;
}
