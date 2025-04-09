import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Login } from '../../../models/login';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService,  } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from '../../usuarios/usuario-form/usuario-form.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, UsuarioFormComponent, MdbModalModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent {

  //imports modal
  modalService = inject(MdbModalService);//para conseguir abrir a modal
  @ViewChild("modalCadastroUsuario") modalCadastroUsuario!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


  login: Login = new Login();
  router = inject(Router);


  logar() {
    if (this.login.username == 'admin' && this.login.password == 'admin') {
      this.gerarToast().fire({ icon: "success", title: "Seja bem-vindo!" });
      this.router.navigate(['admin/dashboard']);
    } else
      Swal.fire('Usuário ou senha incorretos!', '', 'error');
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

  cadastroUsuario() {
    this.modalRef = this.modalService.open(this.modalCadastroUsuario);
  }
  
 

}