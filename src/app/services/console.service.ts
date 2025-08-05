import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Console } from '../models/console';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  http = inject(HttpClient);
  
    API = environment.SERVIDOR + '/api/console';

  constructor() { }
      findAll(): Observable<Console[]>{
            return this.http.get<Console[]>(this.API+'/findAll');
          }
    
      findById(id: number): Observable<Console>{
        return this.http.get<Console>(this.API+'/findById/'+id);
      }
    
      findByNomeStartingWithIgnoreCase(nome: string): Observable<Console[]>{
        let par = new HttpParams()
        .set('nome',nome);
        
        return this.http.get<Console  []>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
      }

      findByMarcaContainingIgnoreCase(nome: string): Observable<Console[]>{
        let par = new HttpParams()
        .set("nome", nome);

        return this.http.get<Console []>(this.API+"/findByMarcaContainingIgnoreCase",{params: par});
      }

      
    
    
      deleteById(id: number): Observable<string>{
        return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
      }
    
      save(console: Console): Observable<string> {
        return this.http.post<string>(this.API+'/save', console, {responseType: 'text' as 'json'});
      }
    
      update(console: Console, id: number): Observable<string> {
        return this.http.put<string>(this.API+'/update/'+id, console, {responseType: 'text' as 'json'});  
      }
}
