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

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "dashboard", component: DashboardComponent},
        {path: "cadastroUsuario", component: UsuarioFormComponent},
        {path: "cadastroJogo", component: JogoFormComponent},
        {path: "usuarios", component: UsuarioListComponent},
        {path: "cidades", component: CidadeListComponent}

        
    ]}
]; 
