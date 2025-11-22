export interface UserStory {
  id: number;
  papel: string; 
  acao: string; 
  beneficio: string; 
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  estimativa: string;
  editando?: boolean; 
}