import { Component, EventEmitter, inject, Input, input, output, Output, TemplateRef, ViewChild,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Jogo } from '../../../models/jogo';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { Console } from '../../../models/console';
import { JogoService } from '../../../services/jogo.service';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { JogoListComponent } from "../jogo-list/jogo-list.component";
import { ConsoleListComponent } from "../../console/console-list/console-list.component";






@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule,  ConsoleListComponent, MdbModalModule],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.scss'
})
export class JogoFormComponent {
 @Input() jogo : Jogo = new Jogo();
 @Output() retorno = new EventEmitter<Console>();

 router = inject(Router);
 rotaAtivida = inject(ActivatedRoute);

 jogoService = inject(JogoService);

 constructor(){
  let id = this.rotaAtivida.snapshot.params['id'];
    if(id > 0){
      this.findByID(id);
    }

   
  }

 
//imports modal
modalService = inject(MdbModalService);//para conseguir abrir a modal
@ViewChild("modalConsoles") modalConsoles!: TemplateRef<any>;
modalRef!: MdbModalRef<any>;

findByID(id: number){
      this.jogoService.findById(id).subscribe({
        next: retorno =>{      
          this.jogo = retorno;
          

        },
        error: erro =>{
          Swal.fire(erro.error, '', 'error');
        }
      })
    }
  



 
 save(){
//instanciando na mao um ibjeto mas tem que fazer com modals
    let meuUsuario = new Usuario();
    meuUsuario.id = 4;;
    this.jogo.usuario = meuUsuario;
    console.log('Enviando Jogo:', this.jogo); // 👈 Isso ajuda!

    if (this.jogo.console && this.jogo.console.id) {
      this.jogo.console = { id: this.jogo.console.id } as Console;
    }

        //arrumar o enum
       
  if(this.jogo.id>0){
  
        this.jogoService.update(this.jogo, this.jogo.id).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          }).then(() => {
            this.router.navigate(['admin/jogos']);
          });
    
          },
          error: erro =>{
            Swal.fire(erro.error, '', 'error');
          }
  
        })
        
      }else{
        this.jogoService.save(this.jogo).subscribe({
          next: mensagem =>{
         
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
  
          }).then(() => {
            this.router.navigate(['admin/jogos']);
          });
    
          },
          error: erro =>{  
            Swal.fire(erro.error, '', 'error');
          }
  
        })
      }
 }
 
 buscarConsoles(){
  this.modalRef = this.modalService.open(this.modalConsoles);

 }

 retornoConsole(console: Console){
  this.jogo.console = console;
  this.modalRef.close();

 }

  selectedFile!: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



}
