import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory } from '../models/historia.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService { 
  
  private apiUrl = 'http://localhost:8080/api/historias';

  constructor(private http: HttpClient) { }


  gerarEProcessarHistorias(data: FormData): Observable<UserStory[]> {
    
    return this.http.post<UserStory[]>(`${this.apiUrl}/gerar-ia`, data);
  }

  enviarParaJira(id: number, projectKey: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-jira/${id}?projectKey=${projectKey}`, null);
  }

  getHistoriasSalvas(): Observable<UserStory[]> {
      return this.http.get<UserStory[]>(`${this.apiUrl}`);
  }

  atualizarHistoria(historia: UserStory): Observable<UserStory> {
      return this.http.put<UserStory>(`${this.apiUrl}/${historia.id}`, historia);
  }

  deletarHistoria(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}