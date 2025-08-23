import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+'/api/usuario';

  constructor() { }


  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+'/findById/'+id);
  }

  findByNomeStartingWithIgnoreCase(nome: string): Observable<Usuario[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Usuario[]>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
  }

  save(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.API+'/save', usuario, {responseType: 'text' as 'json'});
  }

  update(usuario: Usuario, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, usuario, {responseType: 'text' as 'json'});  
  }

  API2 = 'http://localhost:8080/api/connection';

  login(user: Usuario): Observable<string> {
    return this.http.post<string>(`${this.API2}/login`, user, {
      
      responseType: 'text' as 'json'
    });
  }

  logout(user: Usuario): Observable<string> {
    return this.http.post<string>(`${this.API2}/logout`, user, {
      
      responseType: 'text' as 'json'
    });
  }

  findUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API2}/listUsers`);
  }
  
}
