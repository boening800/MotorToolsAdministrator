import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAlquilerComponent } from './listado-alquiler.component';

describe('ListadoAlquilerComponent', () => {
  let component: ListadoAlquilerComponent;
  let fixture: ComponentFixture<ListadoAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
