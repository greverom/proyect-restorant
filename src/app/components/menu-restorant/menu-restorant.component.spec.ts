import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestorantComponent } from './menu-restorant.component';

describe('MenuRestorantComponent', () => {
  let component: MenuRestorantComponent;
  let fixture: ComponentFixture<MenuRestorantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRestorantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuRestorantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
