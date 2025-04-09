import { Component, inject } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from "sweetalert2";



@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {

    lista: Usuario[] = [];
    usuarioService = inject(UsuarioService);

    constructor(){
      this.findAll()
    }

    findAll(){
      this.usuarioService.findAll().subscribe({
        next: (listaRetornada) =>{
          this.lista = listaRetornada;
        },
        error: (erro) =>{
          Swal.fire(erro.error,"","error");
        }
      });
    }

    deleteById(usuario: Usuario){

      
      Swal.fire({
        title: "Você realmente deseja deletar o usuario?",
        showDenyButton: true,
        
        confirmButtonText: "DELETAR",
        denyButtonText: `NÃO DELETAR`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.usuarioService.deleteById(usuario.id).subscribe({
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

