import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminMsgComponent } from './editadmin-msg.component';

describe('EditadminMsgComponent', () => {
  let component: EditadminMsgComponent;
  let fixture: ComponentFixture<EditadminMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditadminMsgComponent]
    });
    fixture = TestBed.createComponent(EditadminMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
