import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasNoAlcoholicasComponent } from './bebidas-no-alcoholicas.component';

describe('BebidasNoAlcoholicasComponent', () => {
  let component: BebidasNoAlcoholicasComponent;
  let fixture: ComponentFixture<BebidasNoAlcoholicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidasNoAlcoholicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidasNoAlcoholicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
