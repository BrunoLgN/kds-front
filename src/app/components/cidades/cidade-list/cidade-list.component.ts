import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade';
import Swal from "sweetalert2";
import { RouterLink } from '@angular/router';
import { ConsoleListComponent } from "../../console/console-list/console-list.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [RouterLink,FormsModule ],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.scss'
})
export class CidadeListComponent {

  lista: Cidade[] = [];
  cidadeService = inject(CidadeService)
  @Input() esconderBotoes : boolean = false; 
  @Output() retorno = new EventEmitter();

  nomeBusca: string = ""; // <-- Campo de busca

  constructor(){
    this.findAll();
  }

  findAll(){
    this.cidadeService.findAll().subscribe({
      next: (listaRetornada) =>{
        this.lista = listaRetornada;
      },
      error: (erro) =>{
        Swal.fire(erro.error,"","error");
      }
    });
  }

  buscarPorNome(){
    if (!this.nomeBusca || this.nomeBusca.trim() === "") {
      this.findAll(); // Se a busca estiver vazia, volta para a lista completa
      return;
    }

    this.cidadeService.findByNomeStartingWithIgnoreCase(this.nomeBusca).subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, "", "error");
      }
    });
  }

  deleteById(cidade: Cidade){
    Swal.fire({
      title: "Você realmente deseja deletar a cidade?",
      showDenyButton: true,
      confirmButtonText: "DELETAR",
      denyButtonText: `NÃO DELETAR`
    }).then((result) => {
      if (result.isConfirmed) {
        this.cidadeService.deleteById(cidade.id).subscribe({
          next: (mensagem) =>{
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            const mensagem = erro.error?.message ||  'Não é possível deletar, pois há vários usuários associados à cidade.';
            Swal.fire('Erro', mensagem, 'error');
          }
        });
      }
    });
  }

  select(cidade: Cidade){
    this.retorno.emit(cidade);
  }
}
