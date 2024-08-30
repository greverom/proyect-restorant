import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFacturacionComponent } from './pago-facturacion.component';

describe('PagoFacturacionComponent', () => {
  let component: PagoFacturacionComponent;
  let fixture: ComponentFixture<PagoFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoFacturacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
