import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStory } from '../../models/historia.model';
import { UserStoryService } from '../../services/user-story.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  historias: UserStory[] = [];
  jiraKey: string = 'KAN';

  constructor(
    private userStoryService: UserStoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarHistorias();
  }

  carregarHistorias(): void {
    this.userStoryService.getHistoriasSalvas().subscribe({
      next: (data) => {
        this.historias = data;
      },
      error: (err) => {
        console.error('Erro ao carregar histórias:', err);
      }
    });
  }

  alternarEdicao(historia: UserStory): void {
    historia.editando = !historia.editando;
    if (!historia.editando) {
      this.userStoryService.atualizarHistoria(historia).subscribe({
        error: (err) => {
          console.error('Falha ao atualizar história:', err);
          alert('Erro ao salvar as alterações da história.');
        }
      });
    }
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta história?')) {
      this.userStoryService.deletarHistoria(id).subscribe({
        next: () => {
          this.carregarHistorias();
        },
        error: (err) => {
          console.error('Falha ao deletar:', err);
          alert('Erro ao deletar a história.');
        }
      });
    }
  }

  enviarParaJira(historia: UserStory): void {
    this.userStoryService.enviarParaJira(historia.id, this.jiraKey).subscribe({
      next: (response) => {
        alert('História enviada com sucesso para o Jira!');
        this.carregarHistorias();
      },
      error: (err) => {
        console.error('Falha ao enviar para o Jira:', err);
        alert('Erro ao enviar para o Jira. Verifique o console e o Backend.');
      }
    });
  }

  navegarParaRoadmap(): void {
    this.router.navigate(['/roadmap']);
  }
}