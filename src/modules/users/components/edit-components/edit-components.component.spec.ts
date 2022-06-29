import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentsComponent } from './edit-components.component';

describe('EditComponentsComponent', () => {
  let component: EditComponentsComponent;
  let fixture: ComponentFixture<EditComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
