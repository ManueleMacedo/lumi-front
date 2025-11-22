import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-inicial.component.html',
  styleUrls: ['./upload-inicial.component.css']
})
export class UploadInicialComponent {
  
  nomeProjeto: string = '';
  contextoAdicional: string = '';
  arquivoSelecionado: File | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.arquivoSelecionado = event.dataTransfer.files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  removerArquivo() {
    this.arquivoSelecionado = null;
  }

  gerarRoadmap() {
    this.router.navigate(['/backlog']);
  }
}