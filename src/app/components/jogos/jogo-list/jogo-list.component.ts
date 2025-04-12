import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Jogo } from '../../../models/jogo';
import { JogoService } from '../../../services/jogo.service';
import Swal from 'sweetalert2';
import { JogoFormComponent } from "../jogo-form/jogo-form.component";


@Component({
  selector: 'app-jogo-list',
  standalone: true,
  imports: [JogoFormComponent],
  templateUrl: './jogo-list.component.html',
  styleUrl: './jogo-list.component.scss'
})
export class JogoListComponent {
   lista: Jogo[] = [];
      jogoService = inject(JogoService);

     
  
      constructor(){
        this.findAll()
      }
  
      findAll(){
        this.jogoService.findAll().subscribe({
          next: (listaRetornada) =>{
            this.lista = listaRetornada;
          },
          error: (erro) =>{
            Swal.fire(erro.error,"","error");
          }
        });
      }
  
      deleteById(jogo: Jogo){
  
        
        Swal.fire({
          title: "Você realmente deseja deletar o jogo?",
          showDenyButton: true,
          
          confirmButtonText: "DELETAR",
          denyButtonText: `NÃO DELETAR`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.jogoService.deleteById(jogo.id).subscribe({
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
