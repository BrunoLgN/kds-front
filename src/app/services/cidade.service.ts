import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private http = inject(HttpClient);
  private API = environment.SERVIDOR + '/api/cidade';

  
  findAll(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/findAll`);
  }

  
  findById(id: number): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.API}/findById/${id}`);
  }

  
  findByNomeStartingWith(nome: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/findByNomeStartingWithIgnoreCase`, {
      params: { nome }
    });
  }

  
  findByNomeIgnoreCase(nome: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/findByNomeIgnoreCase`, {
      params: { nome }
    });
  }

  
  save(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(`${this.API}/save`, cidade);
  }

  
  update(id: number, cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.API}/update/${id}`, cidade);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

}
