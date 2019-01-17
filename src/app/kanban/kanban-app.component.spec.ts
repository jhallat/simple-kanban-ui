import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanAppComponent } from './kanban-app.component';

describe('KanbanAppComponent', () => {
  let component: KanbanAppComponent;
  let fixture: ComponentFixture<KanbanAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
