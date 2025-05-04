import { Cidade } from "./cidade";
import { Jogo } from "./jogo";
import { Ranking } from "./ranking";

export class Usuario {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    username!: string;
    password!: string;
    telefone !: string;
    statusCadastro!: string;
    cidade!: Cidade;
    ranking!: Ranking;//n para 1
    jogos!: Jogo[];//1 para n
    role!: string;

}
