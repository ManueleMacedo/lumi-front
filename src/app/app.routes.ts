import { Routes } from '@angular/router';
import { UploadInicialComponent } from './pages/upload-inicial/upload-inicial.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';

export const routes: Routes = [
  { path: '', component: UploadInicialComponent }, // Tela inicial (raiz)
  { path: 'backlog', component: BacklogComponent }, // Tela 2
  { path: 'roadmap', component: RoadmapComponent }, // Tela 3
  { path: '**', redirectTo: '' } // Se digitar endereço errado, volta pro início
];