import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsuperMsgComponent } from './editsuper-msg.component';

describe('EditsuperMsgComponent', () => {
  let component: EditsuperMsgComponent;
  let fixture: ComponentFixture<EditsuperMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditsuperMsgComponent]
    });
    fixture = TestBed.createComponent(EditsuperMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
