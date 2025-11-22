import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStory } from '../../models/user-story.model';

// Criando uma interface simples só para essa tela (pode ficar aqui mesmo)
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
export class RoadmapComponent {

  jiraKey: string = 'GROWUP'; // Valor inicial do input
  statusSincronizacao: 'PARADO' | 'CARREGANDO' | 'SUCESSO' = 'PARADO';
  
  // Dados Mockados das Colunas
  sprints: Sprint[] = [
    {
      titulo: 'Semana 1',
      periodo: '05/11 - 12/11',
      cards: [
        { id: 1, papel: 'usuário', acao: 'fazer login', beneficio: 'acessar conta', prioridade: 'ALTA', estimativa: '4h' },
        { id: 3, papel: 'vendedor', acao: 'registrar vendas', beneficio: 'atualizar estoque', prioridade: 'MEDIA', estimativa: '2h' }
      ]
    },
    {
      titulo: 'Semana 2',
      periodo: '13/11 - 20/11',
      cards: [
        { id: 2, papel: 'gerente', acao: 'ver relatórios', beneficio: 'tomar decisões', prioridade: 'ALTA', estimativa: '6h' }
      ]
    },
    {
      titulo: 'Overflow',
      periodo: 'Futuro',
      cards: [
        { id: 4, papel: 'admin', acao: 'gerenciar users', beneficio: 'segurança', prioridade: 'BAIXA', estimativa: '3h' }
      ]
    }
  ];

  // Simula a chamada para a API do Jira
  sincronizarComJira() {
    if (!this.jiraKey) return;

    this.statusSincronizacao = 'CARREGANDO';

    // Espera 2 segundos para fingir que está enviando
    setTimeout(() => {
      this.statusSincronizacao = 'SUCESSO';
      
      // Opcional: Voltar ao normal depois de 3 segundos
      setTimeout(() => {
        this.statusSincronizacao = 'PARADO';
      }, 4000);
    }, 2000);
  }
}