import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStory } from '../../models/user-story.model';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {


  constructor(private router: Router) {}

  historias: UserStory[] = [
    {
      id: 1,
      papel: 'usuário',
      acao: 'fazer login no sistema',
      beneficio: 'acessar minhas funcionalidades',
      prioridade: 'ALTA',
      estimativa: '4 tarefas',
      editando: false
    },
    {
      id: 2,
      papel: 'gerente',
      acao: 'visualizar relatórios de vendas',
      beneficio: 'tomar decisões estratégicas',
      prioridade: 'ALTA',
      estimativa: '6 tarefas',
      editando: false
    },
    {
      id: 3,
      papel: 'vendedor',
      acao: 'registrar novas vendas',
      beneficio: 'manter o estoque atualizado',
      prioridade: 'MEDIA',
      estimativa: '2 tarefas',
      editando: false
    },
    {
      id: 4,
      papel: 'administrador',
      acao: 'gerenciar usuários',
      beneficio: 'garantir a segurança',
      prioridade: 'MEDIA',
      estimativa: '3 tarefas',
      editando: false
    }
  ];

  deletar(id: number) {
    if(confirm('Tem certeza que deseja remover esta história?')) {
      this.historias = this.historias.filter(h => h.id !== id);
    }
  }

  alternarEdicao(historia: UserStory) {
    historia.editando = !historia.editando;
  }
  
  avancar() {
    this.router.navigate(['/roadmap']);
  }
}