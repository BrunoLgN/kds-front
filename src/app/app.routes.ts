import { Component, computed } from '@angular/core';
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

import { adminGuard } from './auth/guard.guard';
import { JogoDetalheComponent } from './components/jogos/jogo-detalhe/jogo-detalhe.component';
import { MessageComponent } from 'stream-chat-angular';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    
    {path: "admin", component: PrincipalComponent, canActivate:[adminGuard], children:[
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
         {
        path: "chat",
        loadComponent: () =>
          import('./components/chat/messages/messages.component').then(
            (m) => m.MessagesComponent
          ),
      }
        

        
    ]}
]; 
