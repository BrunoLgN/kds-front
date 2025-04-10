import { Component, inject } from '@angular/core';
import { Ranking } from '../../../models/ranking';
import { RankingService } from '../../../services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking-list',
  standalone: true,
  imports: [],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss'
})
export class RankingListComponent {
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
