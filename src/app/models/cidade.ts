import { Usuario } from "./usuario";

export class Cidade {
    id!: number;
    nome!: string;
    usuarios?: Usuario[]; 
  }
  
