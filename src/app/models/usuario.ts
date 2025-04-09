import { Cidade } from "./cidade";
import { Jogo } from "./jogo";
import { Ranking } from "./ranking";

export class Usuario {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    senha!: string;
    telefone !: string;
    statusCadastro!: string;
    cidade!: Cidade;
    ranking!: Ranking;//n para 1
    jogo!: Jogo[];//1 para n

}
/* EXEMPLO PROFESSOR
id!: number;
nome!: string;
modelo!: string;
marca!: Marca; //N PARA 1
acessorios!: Acessorio[]; // N PARA N*/