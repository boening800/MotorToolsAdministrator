import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReservaComponent } from './listado-reserva.component';

describe('ListadoReservaComponent', () => {
  let component: ListadoReservaComponent;
  let fixture: ComponentFixture<ListadoReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
