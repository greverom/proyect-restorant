import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasOcupadasComponent } from './mesas-ocupadas.component';

describe('MesasOcupadasComponent', () => {
  let component: MesasOcupadasComponent;
  let fixture: ComponentFixture<MesasOcupadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasOcupadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesasOcupadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
