/*import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService,  } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from '../../usuarios/usuario-form/usuario-form.component';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';


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

  loginService = inject(LoginService);
  login: Login = new Login();
  router = inject(Router);

  constructor(){
    this.loginService.removerToken();
  }

  logar() {

    this.loginService.logar(this.login).subscribe({
      next: token =>{
        if(token){
          this.loginService.addToken(token);
          this.router.navigate(['/admin/dashboard'])
        }else{
          alert("Usuario ou senha incorretos")
        }
      },
      error: erro =>{
        alert('deu erro');
      }
    });

    
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
  
 

}*/