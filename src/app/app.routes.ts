import { Component, computed } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "TelaPrincipal", component: PrincipalComponent, children:[

        
    ]}
]; 
