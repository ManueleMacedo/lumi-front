import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInicialComponent } from './upload-inicial.component';

describe('UploadInicialComponent', () => {
  let component: UploadInicialComponent;
  let fixture: ComponentFixture<UploadInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadInicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
