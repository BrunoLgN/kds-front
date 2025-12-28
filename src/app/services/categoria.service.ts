import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);
  private API = environment.SERVIDOR + '/api/categoria';

  
  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API}/findAll`);
  }

  
  findById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API}/findById/${id}`);
  }

  
  save(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.API}/save`, categoria);
  }

  
  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API}/update/${id}`, categoria);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }
}
