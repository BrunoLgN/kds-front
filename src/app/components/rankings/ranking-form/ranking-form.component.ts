import { Component, inject } from '@angular/core';
import { Ranking } from '../../../models/ranking';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CidadeService } from '../../../services/cidade.service';
import { RankingService } from '../../../services/ranking.service';
import Swal from 'sweetalert2';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';

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
    
  
    constructor(private router: Router) {
      let id = this.rotaAtivida.snapshot.params['id'];
      if (id > 0) {
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
      const rankingParaEnviar = { ...this.ranking };
      delete rankingParaEnviar.usuarios; 
      
  
      if(this.ranking.id>0){
        console.log(this.ranking);  // Verifique os dados antes de enviar

        this.rankingService.update(rankingParaEnviar, this.ranking.id).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          }).then(() =>{
            this.router.navigate(['admin/rankings']);

          })
          
          },
          error: erro =>{
            Swal.fire(erro.error, '', 'error');
          }
  
        })
        
      }else{
        this.rankingService.save(rankingParaEnviar).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          }).then(() => {
            this.router.navigate(['admin/rankings']);
          });
    
          },
          error: erro =>{  
            Swal.fire(erro.error, '', 'error');
          }
  
        })
      }
    }
}
