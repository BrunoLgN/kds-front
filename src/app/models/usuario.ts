import { Cidade } from "./cidade";
import { Jogo } from "./jogo";
import { Ranking } from "./ranking";

export class Usuario {
  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  username!: string;
  telefone!: string;
  role!: string;
  connected!: boolean; // ⚠️ era string, agora boolean!
  
  cidade!: Cidade;     // ManyToOne
  ranking?: Ranking;   // opcional pois pode vir null
  jogos?: Jogo[];      // opcional pois nem sempre vem
}
