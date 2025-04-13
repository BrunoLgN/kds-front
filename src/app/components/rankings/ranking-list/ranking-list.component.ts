import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Ranking } from '../../../models/ranking';
import { RankingService } from '../../../services/ranking.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-ranking-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss'
})
export class RankingListComponent {
  @Input() esconderBotoes : boolean = false; 
     @Output() retorno = new EventEmitter(); 

     nomeBusca: string = ""; // <-- Campo de busca

    lista: Ranking[] = [];
        rankingService = inject(RankingService);
    
        constructor(){
          this.findAll()
        }
    
        findAll(){
          this.rankingService.findAll().subscribe({
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
        
            this.rankingService.findByNomeStartingWithIgnoreCase(this.nomeBusca).subscribe({
              next: (listaRetornada) => {
                this.lista = listaRetornada;
              },
              error: (erro) => {
                Swal.fire(erro.error, "", "error");
              }
            });
          }
    
        deleteById(ranking: Ranking){
    
          
          Swal.fire({
            title: "Você realmente deseja deletar o usuario?",
            showDenyButton: true,
            
            confirmButtonText: "DELETAR",
            denyButtonText: `NÃO DELETAR`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.rankingService.deleteById(ranking.id).subscribe({
                next: (mensagem) =>{//DEU CERTO
                  Swal.fire(mensagem, '', 'success');
                  this.findAll();
                },
                error: (erro) =>{//DEU ERRADO
                  Swal.fire(erro.error, '', 'error');
                }
               });
        }});
    
            
            
          }
}
