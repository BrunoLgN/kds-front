import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Cidade } from '../../../models/cidade';
import { CidadeListComponent } from "../../cidades/cidade-list/cidade-list.component";
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CidadeListComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  @Input() usuario: Usuario = new Usuario();
  @Output() retorno = new EventEmitter();
  usuarioService = inject(UsuarioService);

  rotaAtivida = inject(ActivatedRoute);
  

  construcutor(){
    let id = this.rotaAtivida.snapshot.params["id"];
    if(id>0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.usuarioService.findById(id).subscribe({
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
  

  save(){
    if(this.usuario.id>0){
    //instanciando na mao um ibjeto mas tem que ser autoincrement com o id do login
    let minhacidade = new Cidade();
    minhacidade.id = 2;;
    this.usuario.cidade = minhacidade;
    //termiino da instanciacao

    
    this.usuarioService.update(this.usuario, this.usuario.id).subscribe({
      next: mensagem =>{
       
        Swal.fire({
          title: mensagem,
          icon: "error",
          confirmButtonText: "Ok",

        });

        this.retorno.emit(`adskfljads`);
  
        },
        error: erro =>{  
          Swal.fire(erro.error, '', 'error');
          this.retorno.emit(`adskfljads`);
        }
    })

  }else{

    
    

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

    });
  }
  }
  buscarCidade(){

  }
}
