import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JogoService } from '../../../services/jogo.service';
import { Jogo } from '../../../models/jogo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jogo-detalhe',
  standalone: true,
  imports: [],
  templateUrl: './jogo-detalhe.component.html',
  styleUrl: './jogo-detalhe.component.scss'
})
export class JogoDetalheComponent {
  jogo!: Jogo;

  constructor(
    private route: ActivatedRoute,
    private jogoService: JogoService
  ){}

  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get("id");
    if (id){
      this.jogoService.findById(+id).subscribe({
        next: (res) =>{
          this.jogo = res;
          
        },
        error:(err) =>{
          console.error('Erro ao buscar jogo:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar o jogo',
            text: 'Verifique se o jogo existe ou tente novamente mais tarde.',
            confirmButtonColor: '#d33'
          });
        }
      })
    }
  }
}
