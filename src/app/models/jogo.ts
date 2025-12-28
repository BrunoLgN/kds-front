import { Console } from "./console";
import { EstadoJogo } from "./estado-jogo";
import { Usuario } from "./usuario";

export class Jogo {
  id!: number;
  nome!: string;
  estadoJogo!: EstadoJogo | string;
  valor!: number;
  usuario!: Usuario;
  disponivel!: boolean;
  console!: Console;
}
