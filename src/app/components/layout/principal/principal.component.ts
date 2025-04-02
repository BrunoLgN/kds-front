import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
