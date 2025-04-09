import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Cidade } from '../../../models/cidade';




@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  usuario: Usuario = new Usuario();
  usuarioService = inject(UsuarioService);

  save(){
    //instanciando na mao um ibjeto mas tem que ser autoincrement com o id do login
    let minhacidade = new Cidade();
    minhacidade.id = 2;;
    this.usuario.cidade = minhacidade;
    //termiino da instanciacao

    this.usuarioService.save(this.usuario).subscribe({
      next: mensagem =>{
        Swal.fire({
          title: mensagem,
          icon: "success",
          confirmButtonText: "Ok"
        });
        this.usuario = new Usuario; // limpa o form
      },
      error: erro =>{
        Swal.fire(erro.error, '', 'error');
      }

    })
  }
}
