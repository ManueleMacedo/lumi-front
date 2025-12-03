import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStory } from '../../models/historia.model';
import { UserStoryService } from '../../services/user-story.service';
import { Router } from '@angular/router';

interface Sprint {
  titulo: string;
  periodo: string;
  cards: UserStory[];
}

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  jiraKey: string = 'KAN';
  statusSincronizacao: string = 'PARADO';
  sprints: Sprint[] = [];
  totalSincronizado: number = 0;

  constructor(
    private userStoryService: UserStoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarDadosRoadmap();
  }

  carregarDadosRoadmap(): void {
    this.userStoryService.getHistoriasSalvas().subscribe({
      next: (historias) => {
        const storiesProntasParaRoadmap = historias.filter(h => h.prioridade && h.estimativa);
        this.sprints = this.organizarRoadmapMock(storiesProntasParaRoadmap);
      },
      error: (err) => {
        console.error('Erro ao carregar histórias para o roadmap:', err);
      }
    });
  }

  organizarRoadmapMock(historias: UserStory[]): Sprint[] {
    const sprintsCriadas: Sprint[] = [
      { titulo: 'Sprint 1', periodo: 'Semanas 1-2', cards: [] },
      { titulo: 'Sprint 2', periodo: 'Semanas 3-4', cards: [] },
      { titulo: 'Sprint 3', periodo: 'Semanas 5-6', cards: [] }
    ];

    historias.forEach((story, index) => {
      sprintsCriadas[index % 3].cards.push(story);
    });

    return sprintsCriadas;
  }

  sincronizarComJira(): void {
    this.statusSincronizacao = 'CARREGANDO';
    this.totalSincronizado = 0;
    
    let historiasParaSincronizar: UserStory[] = [];
    this.sprints.forEach(s => historiasParaSincronizar.push(...s.cards));

    historiasParaSincronizar.forEach((historia, index) => {
      if (historia.jiraIssueKey === null || historia.jiraIssueKey === undefined) {
        this.userStoryService.enviarParaJira(historia.id, this.jiraKey).subscribe({
          next: () => {
            this.totalSincronizado++;
            if (index === historiasParaSincronizar.length - 1) {
              this.statusSincronizacao = 'SUCESSO';
              this.carregarDadosRoadmap(); 
            }
          },
          error: (err) => {
            console.error(`Erro ao sincronizar história ID ${historia.id}:`, err);
            this.statusSincronizacao = 'ERRO';
          }
        });
      }
    });
  }
  
  voltarParaBacklog(): void {
    this.router.navigate(['/backlog']);
  }
}