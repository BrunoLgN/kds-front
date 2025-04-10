import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JogoListComponent } from "../../jogos/jogo-list/jogo-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JogoListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  router = inject(Router);

  cadastrarjogo(){
    this.router.navigate(['admin/cadastroJogo']);
  }
}
