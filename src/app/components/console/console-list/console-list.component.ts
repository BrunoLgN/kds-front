import { Component, inject } from '@angular/core';
import { ConsoleService } from '../../../services/console.service';
import { Console } from '../../../models/console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-console-list',
  standalone: true,
  imports: [],
  templateUrl: './console-list.component.html',
  styleUrl: './console-list.component.scss'
})
export class ConsoleListComponent {
    lista: Console[] = [];
        consoleService = inject(ConsoleService);
    
        constructor(){
          this.findAll()
        }
    
        findAll(){
          this.consoleService.findAll().subscribe({
            next: (listaRetornada) =>{
              this.lista = listaRetornada;
            },
            error: (erro) =>{
              Swal.fire(erro.error,"","error");
            }
          });
        }
    
        deleteById(console: Console){
    
          
          Swal.fire({
            title: "Você realmente deseja deletar o jogo?",
            showDenyButton: true,
            
            confirmButtonText: "DELETAR",
            denyButtonText: `NÃO DELETAR`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.consoleService.deleteById(console.id).subscribe({
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
