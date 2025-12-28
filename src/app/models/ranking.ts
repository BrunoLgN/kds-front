import { Usuario } from "./usuario";

export class Ranking {
    id!: number;
    nome!: string;
    usuarios?: Usuario[]
}
