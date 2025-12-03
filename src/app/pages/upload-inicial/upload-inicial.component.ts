import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStory } from '../../models/historia.model';
import { UserStoryService } from '../../services/user-story.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

type StatusUpload = 'PARADO' | 'CARREGANDO' | 'SUCESSO' | 'ERRO';

@Component({
     selector: 'app-upload-inicial',
     standalone: true,
     imports: [CommonModule, FormsModule, HttpClientModule], 
     templateUrl: './upload-inicial.component.html',
     styleUrls: ['./upload-inicial.component.css']
})
export class UploadInicialComponent implements OnInit {
    
         nomeDoProjeto: string = ''; 
         contextoAdicional: string = ''; 
         arquivoSelecionado: File | null = null; 
         status: StatusUpload = 'PARADO'; 
    
         prompt: string = ''; // Não usado, mas mantido.

         constructor(
              private userStoryService: UserStoryService,
              private router: Router
         ) { }

         ngOnInit(): void {
              
         }

         onFileSelected(event: any): void {
              const file = event.target.files[0];
              if (file) {
                       this.arquivoSelecionado = file;
              } else {
                       this.arquivoSelecionado = null;
              }
         }

         // --- MÉTODO CORRIGIDO ---
         gerarEAvancar(): void {
              if (!this.arquivoSelecionado || this.status === 'CARREGANDO') {
                       alert('Por favor, selecione um arquivo para continuar.');
                       return;
              }

              this.status = 'CARREGANDO';

              // 1. Constrói o prompt completo
              const promptCompleto = `Nome do Projeto: ${this.nomeDoProjeto}\nContexto Adicional: ${this.contextoAdicional}`;

              // 2. Cria o objeto FormData
              const formData = new FormData();
              
              // O backend espera a string com a chave 'prompt'
              formData.append('prompt', promptCompleto);
              
              // O backend espera o arquivo com a chave 'file'
              formData.append('file', this.arquivoSelecionado, this.arquivoSelecionado.name);

              this.userStoryService.gerarEProcessarHistorias(formData).subscribe({
                       next: () => {
                            this.status = 'SUCESSO';
                            this.router.navigate(['/backlog']);
                       },
                       error: (err) => {
                            console.error('Erro na geração de histórias:', err);
                            this.status = 'ERRO';
                            alert('Falha ao gerar histórias. Verifique o console ou a API do Gemini/Backend.');
                       }
              });
         }
}