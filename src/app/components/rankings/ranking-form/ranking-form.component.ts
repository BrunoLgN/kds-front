import { Component, inject } from '@angular/core';
import { Ranking } from '../../../models/ranking';
import { ActivatedRoute } from '@angular/router';
import { CidadeService } from '../../../services/cidade.service';
import { RankingService } from '../../../services/ranking.service';
import Swal from 'sweetalert2';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-ranking-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './ranking-form.component.html',
  styleUrl: './ranking-form.component.scss'
})
export class RankingFormComponent {
   ranking: Ranking = new Ranking();
  
    rotaAtivida = inject(ActivatedRoute);
    rankingService = inject(RankingService);
  
    constructor(){
      let id = this.rotaAtivida.snapshot.params['id'];
      if(id > 0){
        this.findByID(id);
      }
  
     
    }
  
    findByID(id: number){
      this.rankingService.findById(id).subscribe({
        next: retorno =>{      
          this.ranking = retorno;
        },
        error: erro =>{
          Swal.fire(erro.error, '', 'error');
        }
      })
    }
  
    save(){
      const cidadeParaEnviar = { ...this.ranking };
      
  
      if(this.ranking.id>0){
  
        this.rankingService.update(this.ranking, this.ranking.id).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          });
    
          },
          error: erro =>{
            Swal.fire(erro.error, '', 'error');
          }
  
        })
        
      }else{
        this.rankingService.save(this.ranking).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          });
    
          },
          error: erro =>{  
            Swal.fire(erro.error, '', 'error');
          }
  
        })
      }
    }
}
