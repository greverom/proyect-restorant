import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosDeComidaComponent } from './platos-de-comida.component';

describe('PlatosDeComidaComponent', () => {
  let component: PlatosDeComidaComponent;
  let fixture: ComponentFixture<PlatosDeComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatosDeComidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatosDeComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
