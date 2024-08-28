import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasAlcoholicasComponent } from './bebidas-alcoholicas.component';

describe('BebidasAlcoholicasComponent', () => {
  let component: BebidasAlcoholicasComponent;
  let fixture: ComponentFixture<BebidasAlcoholicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidasAlcoholicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidasAlcoholicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
