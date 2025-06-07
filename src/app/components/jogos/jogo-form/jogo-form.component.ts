  import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
  import { Jogo } from '../../../models/jogo';
  import Swal from 'sweetalert2';
  import { Usuario } from '../../../models/usuario';
  import { Console } from '../../../models/console';
  import { JogoService } from '../../../services/jogo.service';
  import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
  import { ConsoleListComponent } from '../../console/console-list/console-list.component';
  import { AuthService } from '../../../services/auth.service';

  @Component({
    selector: 'app-jogo-form',
    standalone: true,
    imports: [
      MdbFormsModule,
      FormsModule,
      ConsoleListComponent,
      MdbModalModule
    ],
    templateUrl: './jogo-form.component.html',
    styleUrl: './jogo-form.component.scss'
  })
  export class JogoFormComponent {
    @Input() jogo: Jogo = new Jogo();
    @Output() retorno = new EventEmitter<Console>();

    // Injeção de dependências
    private router = inject(Router);
    private rotaAtivada = inject(ActivatedRoute);
    private jogoService = inject(JogoService);
    private authService = inject(AuthService);
    private modalService = inject(MdbModalService);

    // Modal de seleção de console
    @ViewChild("modalConsoles") modalConsoles!: TemplateRef<any>;
    modalRef!: MdbModalRef<any>;

    // Upload de imagem
    selectedFile!: File;

    constructor() {
      const id = this.rotaAtivada.snapshot.params['id'];
      if (id > 0) {
        this.findByID(id);
      }
    }

    findByID(id: number): void {
      this.jogoService.findById(id).subscribe({
        next: (retorno) => {
          this.jogo = retorno;
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }

    save(): void {
      
      const payload = this.authService.decodeToken();
      console.log('Payload decodificado:', payload);

      let meuUsuario = new Usuario();
      meuUsuario.id = this.authService.getUsuarioId();
      this.jogo.usuario = meuUsuario
      console.log('Enviando Jogo:', this.jogo); // 👈 Isso ajuda!


      
      // Garante que o console está com ID apenas
      if (this.jogo.console && this.jogo.console.id) {
        this.jogo.console = { id: this.jogo.console.id } as Console;
      }

      // Verifica se é edição ou criação
      if (this.jogo.id > 0) {
        this.jogoService.update(this.jogo, this.jogo.id).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['admin/jogos']);
            });
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      } else {
        this.jogoService.save(this.jogo).subscribe({
          next: (mensagem) => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['admin/jogos']);
            });
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      }
    }

    buscarConsoles(): void {
      this.modalRef = this.modalService.open(this.modalConsoles);
    }

    retornoConsole(console: Console): void {
      this.jogo.console = console;
      this.modalRef.close();
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  }