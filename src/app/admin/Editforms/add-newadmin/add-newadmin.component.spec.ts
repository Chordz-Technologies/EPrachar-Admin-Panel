import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewadminComponent } from './add-newadmin.component';

describe('AddNewadminComponent', () => {
  let component: AddNewadminComponent;
  let fixture: ComponentFixture<AddNewadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewadminComponent]
    });
    fixture = TestBed.createComponent(AddNewadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
