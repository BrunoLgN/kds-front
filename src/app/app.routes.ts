import { Routes } from '@angular/router';

import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { JogoFormComponent } from './components/jogos/jogo-form/jogo-form.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { CidadeListComponent } from './components/cidades/cidade-list/cidade-list.component';
import { JogoListComponent } from './components/jogos/jogo-list/jogo-list.component';
import { RankingListComponent } from './components/rankings/ranking-list/ranking-list.component';
import { ConsoleListComponent } from './components/console/console-list/console-list.component';
import { CidadeFormComponent } from './components/cidades/cidade-form/cidade-form.component';
import { RankingFormComponent } from './components/rankings/ranking-form/ranking-form.component';
import { ConsoleFormComponent } from './components/console/console-form/console-form.component';
import { JogoDetalheComponent } from './components/jogos/jogo-detalhe/jogo-detalhe.component';
import { JogoViewComponent } from './components/jogos/jogo-view/jogo-view.component';

// ❌ Remover Keycloak e Guards temporariamente
// import { KeycloakAuthGuard } from 'keycloak-angular';
// import { AppKeycloakGuard } from './auth/app-keycloak.guard';

// ❌ Remover roles por enquanto
// const ADMIN_ROLE = ['ROLE_ADMIN'];
// const USER_ROLE = ['ROLE_USER'];

export const routes: Routes = [
  { path: "", redirectTo: "admin/dashboard", pathMatch: 'full' },

  {
    path: "admin",
    component: PrincipalComponent,
    // ❌ Sem guard por enquanto
    children: [
      // ⭐ Rotas liberadas temporariamente
      { path: "dashboard", component: DashboardComponent },
      { path: "jogoView", component: JogoViewComponent },
      { path: "jogoDetalhe/:id", component: JogoDetalheComponent },

      // 👑 Rotas administrativas (por enquanto liberadas)
      { path: "cadastroUsuario", component: UsuarioFormComponent },
      { path: "cadastroUsuario/:id", component: UsuarioFormComponent },
      { path: "usuarios", component: UsuarioListComponent },

      { path: "cadastroJogo", component: JogoFormComponent },
      { path: "cadastroJogo/:id", component: JogoFormComponent },
      { path: "jogos", component: JogoListComponent },

      { path: "rankings", component: RankingListComponent },
      { path: "cadastroRanking", component: RankingFormComponent },
      { path: "cadastroRanking/:id", component: RankingFormComponent },

      { path: "cidades", component: CidadeListComponent },
      { path: "cadastroCidade", component: CidadeFormComponent },
      { path: "cadastroCidade/:id", component: CidadeFormComponent },

      { path: "consoles", component: ConsoleListComponent },
      { path: "cadastroConsole", component: ConsoleFormComponent },
      { path: "cadastroConsole/:id", component: ConsoleFormComponent },
    ]
  }
];
