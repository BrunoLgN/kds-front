import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

   http = inject(HttpClient);
    
<<<<<<< HEAD
      API = environment.SERVIDOR + '/api/cidade';
=======
      API = environment.SERVIDOR+'/api/cidade';
>>>>>>> 08b9b4b77c794e0a6e75d3b5cde080146e18607f

  constructor() { }


  findAll(): Observable<Cidade[]>{
    return this.http.get<Cidade[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Cidade>{
    return this.http.get<Cidade>(this.API+'/findById/'+id);
  }

  findByNomeStartingWithIgnoreCase(nome: string): Observable<Cidade[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Cidade[]>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
  }

  save(cidade: Cidade): Observable<string> {
    return this.http.post<string>(this.API+'/save', cidade, {responseType: 'text' as 'json'});
  }

  update(cidade: Cidade, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, cidade, {responseType: 'text' as 'json'});  
  }

}
