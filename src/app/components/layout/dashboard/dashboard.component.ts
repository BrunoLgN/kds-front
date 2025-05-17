import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JogoService } from '../../../services/jogo.service';  // Importe o serviço de jogos
import { Jogo } from '../../../models/jogo'; // Importe o modelo de Jogo
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  router = inject(Router);
  jogoService = inject(JogoService); 
  categoriaService = inject(CategoriaService); // Injeta o serviço de jogos
  lista: Jogo[] = [];  // Lista de jogos a ser exibida
  categorias: Categoria[] = [];  // Lista de categorias a ser exibida
  categoriaSelecionada: string = '';  // Variável para armazenar a categoria selecionada


  // Construtor
  constructor() {
    this.findAll(); // Carrega todos os jogos ao inicializar o componente
    this.carregarCategorias();
  }

  // Método para buscar todos os jogos
  findAll() {
    this.jogoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;  // Atribui os jogos à lista
      },
      error: (erro) => {
        Swal.fire(erro.error, "", "error");  // Exibe mensagem de erro caso ocorra um problema
      }
    });
  }

  filtrarPorConsole(consoleId: number) {
    this.jogoService.findByConsole(consoleId).subscribe({
      next: (jogosFiltrados) => this.lista = jogosFiltrados,
      error: (err) => console.error(err)
    });
    console.log(`Enviando para o backend o consoleId: ${consoleId}`);
  }


  // Método para redirecionar ao cadastro de jogo
  cadastrarjogo() {
    this.router.navigate(['admin/cadastroJogo']);
  }

  carregarCategorias() {
    this.categoriaService.findAll().subscribe({
      next: (categoriasRetornadas) => {
        this.categorias = categoriasRetornadas;  // Atribui as categorias à lista
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias', erro);  // Exibe erro no console
      }
    });
  }
  
  irParaDetalhe(id: number){
    this.router.navigate(["/admin/jogoDetalhe",id]);
  }
 

}
