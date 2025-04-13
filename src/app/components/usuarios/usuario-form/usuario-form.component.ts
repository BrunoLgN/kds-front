import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Cidade } from '../../../models/cidade';
import { CidadeListComponent } from "../../cidades/cidade-list/cidade-list.component";
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Ranking } from '../../../models/ranking';
import { Jogo } from '../../../models/jogo';




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

   //imports modal
    modalService = inject(MdbModalService);//para conseguir abrir a modal
    @ViewChild("modalCidadeDetalhe") modalCidadeDetalhe!: TemplateRef<any>;
    modalRef!: MdbModalRef<any>;

    @ViewChild('modalCadastroUsuario') modalCadastroUsuario!: TemplateRef<any>;



  rotaAtivida = inject(ActivatedRoute);
  

  constructor(){
    let id = this.rotaAtivida.snapshot.params["id"];
    if(id>0){
      this.findById(id);
    }
  }
 

  findById(id: number){
    this.usuarioService.findById(id).subscribe({
            next: retorno =>{      
              this.usuario = retorno;
              
    
            },
            error: erro =>{
              Swal.fire(erro.error, '', 'error');
            }
          })
  }
  

  save() {
      // Verifica e envia apenas os IDs de cidade e ranking
      console.log("Dados do usuário antes de salvar:", this.usuario);  // Aqui você pode ver os dados do usuário antes de enviar.

      if (this.usuario.cidade && this.usuario.cidade.id) {
        this.usuario.cidade = { id: this.usuario.cidade.id } as Cidade;
      }
  
      if (this.usuario.ranking && this.usuario.ranking.id) {
        this.usuario.ranking = { id: this.usuario.ranking.id } as Ranking;
      }
      if (this.usuario.jogos && this.usuario.jogos.length > 0) {
        this.usuario.jogos = this.usuario.jogos.map(jogo => {
          if (jogo && jogo.id) {
            return { id: jogo.id } as Jogo;
          }
          return jogo;  // Caso o jogo não tenha id, ele permanece inalterado
        });
      }
      
    
  
    if (this.usuario.id > 0) {
      this.usuarioService.update(this.usuario, this.usuario.id).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.retorno.emit('usuarioAtualizado');
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
          this.retorno.emit('erroAtualizar');
        }
      });
  
    } else {
      this.usuarioService.save(this.usuario).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: "success",
            confirmButtonText: "Ok"
          });
          this.usuario = new Usuario(); // limpa o form
          this.retorno.emit('usuarioCriado');
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
          this.retorno.emit('erroCriar');
        }
      });
    }
  }
  
  
  buscarCidade(){
    this.modalRef = this.modalService.open(this.modalCidadeDetalhe, {modalClass: "modal-lg "});
  }
  retornoCidade(cidade: Cidade){
    this.usuario.cidade = cidade;
    this.modalRef.close();
  }

 

}
