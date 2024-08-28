import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollosDeCanelaComponent } from './rollos-de-canela.component';

describe('RollosDeCanelaComponent', () => {
  let component: RollosDeCanelaComponent;
  let fixture: ComponentFixture<RollosDeCanelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollosDeCanelaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RollosDeCanelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
