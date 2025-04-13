import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ConsoleService } from '../../../services/console.service';
import { Console } from '../../../models/console';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-console-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './console-list.component.html',
  styleUrl: './console-list.component.scss'
})
export class ConsoleListComponent {
    @Output("retorno") retorno = new EventEmitter<any>();
    @Input("esconderBotoes") esconderBotoes: boolean = false

    nomeBusca: string = ""; // <-- Campo de busca
  
    lista: Console[] = [];
        consoleService = inject(ConsoleService);
    
        constructor(){
        this.findAll();
        
        }
    
        findAll(){
          this.consoleService.findAll().subscribe({
            next: (listaRetornada) =>{
              this.lista = listaRetornada;
            },
            error: (erro) =>{
              Swal.fire(erro.error,"","error");
            }
          });
        }

        buscarPorNome(){
                    if (!this.nomeBusca || this.nomeBusca.trim() === "") {
                      this.findAll(); // Se a busca estiver vazia, volta para a lista completa
                      return;
                    }
                
                    this.consoleService.findByNomeStartingWithIgnoreCase(this.nomeBusca).subscribe({
                      next: (listaRetornada) => {
                        this.lista = listaRetornada;
                      },
                      error: (erro) => {
                        Swal.fire(erro.error, "", "error");
                      }
                    });
                  }
    
        deleteById(console: Console){
    
          
          Swal.fire({
            title: "Você realmente deseja deletar o jogo?",
            showDenyButton: true,
            
            confirmButtonText: "DELETAR",
            denyButtonText: `NÃO DELETAR`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.consoleService.deleteById(console.id).subscribe({
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

          selecionarConsole(console: Console): void {
            // Emite o console selecionado
            this.retorno.emit(console);  // Aqui estamos emitindo o objeto Console
          }

}
