import { Console } from "./console";
import { EstadoJogo } from "./estado-jogo";
import { Usuario } from "./usuario";

export class Jogo {
    id!: number;
    nome!: string;
    estadoJogo!: EstadoJogo; // enum para estado jogo
    valor!:number;
    usuario!: Usuario;//n para 1
    console!: Console//n para 1
}
