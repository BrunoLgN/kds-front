import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CidadeService } from '../../../services/cidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from '../../../models/cidade';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cidade-form.component.html',
  styleUrl: './cidade-form.component.scss'
})
export class CidadeFormComponent {
  cidade: Cidade = new Cidade();

  rotaAtivida = inject(ActivatedRoute);
  cidadeService = inject(CidadeService);

  constructor(private router: Router){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id > 0){
      this.findByID(id);
    }

   
  }

  findByID(id: number){
    this.cidadeService.findById(id).subscribe({
      next: retorno =>{      
        this.cidade = retorno;
      },
      error: erro =>{
        Swal.fire(erro.error, '', 'error');
      }
    })
  }

  save(){
    const cidadeParaEnviar = { ...this.cidade };
    delete cidadeParaEnviar.usuarios; 

    if(this.cidade.id>0){

      this.cidadeService.update(cidadeParaEnviar, this.cidade.id).subscribe({
        next: mensagem =>{
       
        Swal.fire({
          title: mensagem,
          icon: "success",
          confirmButtonText: "Ok",

        }).then(() =>{
          this.router.navigate(['admin/cidades']);

        })
  
        },
        error: erro =>{
          Swal.fire(erro.error, '', 'error');
        }

      })
      
    }else{
      this.cidadeService.save(cidadeParaEnviar).subscribe({
        next: mensagem =>{
       
        Swal.fire({
          title: mensagem,
          icon: "success",
          confirmButtonText: "Ok",

        }).then(() =>{
          this.router.navigate(['admin/cidades']);

        })
  
        },
        error: erro =>{  
          Swal.fire(erro.error, '', 'error');
        }

      })
    }
  }
}
