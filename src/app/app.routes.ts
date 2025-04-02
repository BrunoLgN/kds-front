import { Component, computed } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MenuComponent } from './components/layout/menu/menu.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "menu", component: MenuComponent, children:[

        
    ]}
]; 
