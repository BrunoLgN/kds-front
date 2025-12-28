/*import { Component, computed } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MenuComponent } from './components/layout/menu/menu.component';
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
import { MessageComponent } from 'stream-chat-angular';
import { JogoViewComponent } from './components/jogos/jogo-view/jogo-view.component';



export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    
    {path: "admin", component: PrincipalComponent, children:[
        {path: "dashboard", component: DashboardComponent},
        {path: "cadastroUsuario", component: UsuarioFormComponent},
        {path: "cadastroUsuario/:id", component: UsuarioFormComponent},
        {path: "cadastroJogo", component: JogoFormComponent},
        {path: "cadastroJogo/:id", component: JogoFormComponent},
        {path: "usuarios", component: UsuarioListComponent},
        {path: "cidades", component: CidadeListComponent},
        {path: "jogos", component: JogoListComponent},
        {path: "rankings", component: RankingListComponent},
        {path: "consoles", component: ConsoleListComponent},
        {path: "cadastroConsole/:id", component: ConsoleFormComponent},
        {path: "cadastroConsole", component: ConsoleFormComponent},
        {path: "cadastroCidade", component: CidadeFormComponent},
        { path: "cadastroCidade/:id", component: CidadeFormComponent },
        {path: "cadastroRanking", component: RankingFormComponent},
        { path: "cadastroRanking/:id", component: RankingFormComponent },
        {path: "jogoDetalhe/:id", component: JogoDetalheComponent},
        {path: "jogoView", component: JogoViewComponent},
         {
        path: "chat",
        
      }
        

        
    ]}
]; 
*/
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
// 💡 Importe o AuthGuard do Keycloak

//import { LoginComponent } from './components/layout/login/login.component';
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
import { inject } from '@angular/core';
import { JogoViewComponent } from './components/jogos/jogo-view/jogo-view.component';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { AppKeycloakGuard } from './auth/app-keycloak.guard';

// Definição das Roles (use as roles exatas do seu Keycloak)
const ADMIN_ROLE = ['ROLE_ADMIN'];
const USER_ROLE = ['ROLE_USER'];

export const routes: Routes = [
    // 💡 FLUXO CORRETO: Redireciona o URL raiz (/) para o Dashboard, que é PROTEGIDO.
    // O Keycloak interceptará este caminho e forçará o login primeiro.
    { path: "", redirectTo: "admin/dashboard", pathMatch: 'full' },
    
   

    // 🛡️ ROTA PAI PROTEGIDA: Exige autenticação e role para o acesso
    {
        path: "admin",
        component: PrincipalComponent,
        //canActivate: [KeycloakAuthGuard], // ⬅️ Protege o acesso
        canActivate: [AppKeycloakGuard],
        children: [
            // Rotas de Usuário Comum (Logado)
            { 
                path: "dashboard", 
                component: DashboardComponent,
                data: { roles: USER_ROLE } 
            },
            { 
                path: "jogoView", 
                component: JogoViewComponent,
                data: { roles: USER_ROLE }
            },
            { 
                path: "jogoDetalhe/:id", 
                component: JogoDetalheComponent,
                data: { roles: USER_ROLE }
            },
            
            
            // 👑 Rotas Protegidas por Role (Exigem apenas ADMIN)
            { path: "cadastroUsuario", component: UsuarioFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroUsuario/:id", component: UsuarioFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "usuarios", component: UsuarioListComponent, data: { roles: ADMIN_ROLE } },
            
            { path: "cadastroJogo", component: JogoFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroJogo/:id", component: JogoFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "jogos", component: JogoListComponent, data: { roles: ADMIN_ROLE } },
            
            { path: "rankings", component: RankingListComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroRanking", component: RankingFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroRanking/:id", component: RankingFormComponent, data: { roles: ADMIN_ROLE } },
            
            { path: "cidades", component: CidadeListComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroCidade", component: CidadeFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroCidade/:id", component: CidadeFormComponent, data: { roles: ADMIN_ROLE } },
            
            { path: "consoles", component: ConsoleListComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroConsole", component: ConsoleFormComponent, data: { roles: ADMIN_ROLE } },
            { path: "cadastroConsole/:id", component: ConsoleFormComponent, data: { roles: ADMIN_ROLE } },
        ]
    }
];
