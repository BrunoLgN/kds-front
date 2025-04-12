import { Component, EventEmitter, inject, Input, input, output, Output, TemplateRef, ViewChild,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Jogo } from '../../../models/jogo';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { Console } from '../../../models/console';
import { JogoService } from '../../../services/jogo.service';
import { ConsoleListComponent } from "../../console/console-list/console-list.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';





@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ConsoleListComponent],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.scss'
})
export class JogoFormComponent {
 @Input() jogo : Jogo = new Jogo();
 jogoService = inject(JogoService);




 
 save(){
//instanciando na mao um ibjeto mas tem que fazer com modals
    let meuUsuario = new Usuario();
    meuUsuario.id = 4;;
    this.jogo.usuario = meuUsuario;
    //termiino da instanciacao

   

        //arrumar o enum
       
  this.jogoService.save(this.jogo).subscribe({
    next: mensagem =>{
     Swal.fire({
              title: mensagem,
              icon: "success",
              confirmButtonText: "Ok"
            });
      this.jogo = new Jogo //limpa o form
    },
    error: erro =>{
      Swal.fire(erro.error,"","error");
    }

  })
 }



}
