import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from '../models/ranking';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
http = inject(HttpClient);

  API = environment.SERVIDOR+'/api/ranking';
  constructor() { }
findAll(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Ranking>{
    return this.http.get<Ranking>(this.API+'/findById/'+id);
  }

  findByNomeStartingWithIgnoreCase(nome: string): Observable<Ranking[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Ranking  []>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
  }

  save(ranking: Ranking): Observable<string> {
    return this.http.post<string>(this.API+'/save', ranking, {responseType: 'text' as 'json'});
  }

  update(ranking: Ranking, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, ranking, {responseType: 'text' as 'json'});  
  }






}
