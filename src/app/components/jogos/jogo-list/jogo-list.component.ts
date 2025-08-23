import { Component, inject } from '@angular/core';
import { Jogo } from '../../../models/jogo';
import { JogoService } from '../../../services/jogo.service';
import Swal from 'sweetalert2';
import { JogoFormComponent } from "../jogo-form/jogo-form.component";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jogo-list',
  standalone: true,
  imports: [JogoFormComponent, RouterLink, FormsModule],
  templateUrl: './jogo-list.component.html',
  styleUrls: ['./jogo-list.component.scss']
})
export class JogoListComponent {
  
  lista: Jogo[] = [];
  nomeBusca: string = ""; // Campo de busca
  pagina: any;
  numPaginaAtual = 0;

  jogoService = inject(JogoService);

  constructor() {
    this.findAllAll();
  }

  findAllAll(){
            this.jogoService.findAllAll().subscribe({
              next: (listaRetornada) =>{
                this.lista = listaRetornada;
              },
              error: (erro) =>{
                Swal.fire(erro.error,"","error");
              }
            });
          }

  findAll() {
    this.jogoService.findAll(this.numPaginaAtual).subscribe({
      next: (pagina) => {
        this.pagina = pagina;
        this.lista = pagina.content;
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  buscarPorNome() {
    if (!this.nomeBusca || this.nomeBusca.trim() === "") {
      this.findAll();
      return;
    }

    this.jogoService.findByNomeStartingWithIgnoreCase(this.nomeBusca).subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, "", "error");
      }
    });
  }

  deleteById(jogo: Jogo) {
    Swal.fire({
      title: "Você realmente deseja deletar o jogo?",
      showDenyButton: true,
      confirmButtonText: "DELETAR",
      denyButtonText: `NÃO DELETAR`
    }).then((result) => {
      if (result.isConfirmed) {
        this.jogoService.deleteById(jogo.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      }
    });
  }
}
