import { Component, EventEmitter, inject, Output,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Jogo } from '../../../models/jogo';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { Console } from '../../../models/console';
import { JogoService } from '../../../services/jogo.service';
import { EstadoJogo } from '../../../models/estado-jogo';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './jogo-form.component.html',
  styleUrl: './jogo-form.component.scss'
})
export class JogoFormComponent {
  
  @Output("meuEvento") meuEvento = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

    rotaAtivida = inject(ActivatedRoute);
    roteador = inject(Router);
    jogoService = inject(JogoService);


    jogo: Jogo = {
      id: 0,
      nome: '',
      estadoJogo: EstadoJogo.NOVO, // valor default
      valor: 0,
      usuarios: {} as Usuario,
      console: {} as Console
    };

    listaEstados = Object.values(EstadoJogo);

    selecionarUsuario(usuario : Usuario){
      this.jogo.usuarios = usuario;
    }

    selecionarConsole(console : Console){
      this.jogo.console = console;
    }

    selecionarEstadoJogo(estado : EstadoJogo){
      this.jogo.estadoJogo = estado;
    }
     save(){
      //save
      this.jogoService.save(this.jogo).subscribe({

        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/carros']);
          this.meuEvento.emit("OK");
        },
        error:(erro) => {
          Swal.fire(erro.error,"","error");
        }

      })
     }

    
}
