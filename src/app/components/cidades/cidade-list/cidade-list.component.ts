import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade';
import Swal from "sweetalert2";
import { RouterLink } from '@angular/router';
import { ConsoleListComponent } from "../../console/console-list/console-list.component";

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [RouterLink, ConsoleListComponent],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.scss'
})
export class CidadeListComponent {

  lista: Cidade[] = [];
  cidadeService = inject(CidadeService)
  @Input() esconderBotoes : boolean = false; 
   @Output() retorno = new EventEmitter();

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

  deleteById(cidade: Cidade){
    if(confirm("Deseja deletar?")){
      this.cidadeService.deleteById(cidade.id).subscribe({
        next: (mensagem) =>{//DEU CERTO
                    Swal.fire(mensagem, '', 'success');
                    this.findAll();
                  },
                  error: (erro) =>{//DEU ERRADO
                    Swal.fire(erro.error, '', 'error');
                  }
      });
    }
  }
  select(cidade: Cidade){
    this.retorno.emit(cidade);
  }
}
