import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Console } from '../../../models/console';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from '../../../services/console.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-console-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './console-form.component.html',
  styleUrl: './console-form.component.scss'
})
export class ConsoleFormComponent {
  console: Console = new Console();
  router = inject(Router);

   rotaAtivida = inject(ActivatedRoute);
   consoleService = inject(ConsoleService);

   selectedConsole: string | null = null;

   constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }

    
   }

   findById(id: number){
    this.consoleService.findById(id).subscribe({
      next: retorno =>{      
        this.console = retorno;
      },
      error: erro =>{
        Swal.fire(erro.error, '', 'error');
       
      }
    });
  }
   save(){
        
         if(this.console.id>0){
     
           this.consoleService.update(this.console, this.console.id).subscribe({
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
           this.consoleService.save(this.console).subscribe({
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

       selectConsole(console: string): void {
        this.selectedConsole = console;
       
      }
}
