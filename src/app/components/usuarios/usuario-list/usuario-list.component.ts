import { Component, inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from "sweetalert2";
import { MdbModalModule, MdbModalRef, MdbModalService,  } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from '../../usuarios/usuario-form/usuario-form.component';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';




@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, UsuarioFormComponent, MdbModalModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {
  @Output () usuario = new Usuario;
  //imports modal
  modalService = inject(MdbModalService);//para conseguir abrir a modal
  @ViewChild("modalCadastroUsuario") modalCadastroUsuario!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  usuarioEdit: Usuario = new Usuario();

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
  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  editUsuario(usuario: Usuario) {
    this.usuarioEdit = Object.assign({}, usuario);
    this.modalRef = this.modalService.open(this.modalCadastroUsuario);
  }

  retornoModal(mensagem:AnyCatcher){
    this.modalRef.close();
    this.findAll();
  }
  
      
    }
  

