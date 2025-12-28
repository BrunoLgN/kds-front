import { Usuario } from "./usuario";
import { Jogo } from "./jogo";
import { StatusTroca } from "./status-troca";


export class Troca {
  id!: number;
  usuarioA!: Usuario;
  usuarioB!: Usuario;
  jogoX!: Jogo;
  jogoY!: Jogo;
  status!: StatusTroca;
  confirmadaPorUsuarioA!: boolean;
  confirmadaPorUsuarioB!: boolean;
  criadaEm!: string;
  concluidaEm?: string;
}
