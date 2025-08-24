import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo';
import { environment } from '../../environments/environment';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Pagina } from '../models/pagina';
@Injectable({
  providedIn: 'root'
})
export class JogoService {
http = inject(HttpClient);

  API = environment.SERVIDOR+'/api/jogo';
  constructor() { }

    findAll(numPaginaAtual: number): Observable<Pagina>{ 
    return this.http.get<Pagina>(this.API+'/findAll/'+numPaginaAtual); 
  } 

    findAllAll(): Observable<Jogo[]>{
      return this.http.get<Jogo[]>(this.API+'/findAllAll');
    }
  
    findById(id: number): Observable<Jogo>{
      return this.http.get<Jogo>(this.API+'/findById/'+id);
    }
  
    findByNomeStartingWithIgnoreCase(nome: string): Observable<Jogo[]>{
      let par = new HttpParams()
      .set('nome',nome);
      
      return this.http.get<Jogo  []>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
    }
    
   //ARRUMAR O FINDBYCONSOLE []

   findByConsole(consoleId: number): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.API+"/findByConsole", {
      params: { consoleId: consoleId.toString() }
    });
  }
  
   deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
  }
  
    save(jogo: Jogo): Observable<string> {
      return this.http.post<string>(this.API+'/save', jogo, {responseType: 'text' as 'json'});
    }
  
    update(jogo: Jogo, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, jogo, {responseType: 'text' as 'json'});  
    }


}
