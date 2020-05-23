import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlquilerComponent } from './registro-alquiler.component';

describe('RegistroAlquilerComponent', () => {
  let component: RegistroAlquilerComponent;
  let fixture: ComponentFixture<RegistroAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
