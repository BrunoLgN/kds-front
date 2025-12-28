import { Usuario } from "./usuario";
import { Jogo } from "./jogo";
import { StatusAnuncio } from "./status-anuncio";


export class Anuncio {
  id!: number;
  usuario!: Usuario;
  jogo!: Jogo;
  descricao!: string;
  status!: StatusAnuncio;
  criadoEm!: string;
}
