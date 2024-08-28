import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopasComponent } from './sopas.component';

describe('SopasComponent', () => {
  let component: SopasComponent;
  let fixture: ComponentFixture<SopasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SopasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SopasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
