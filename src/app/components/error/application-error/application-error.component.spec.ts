import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationErrorComponent } from './application-error.component';

describe('ApplicationErrorComponent', () => {
  let component: ApplicationErrorComponent;
  let fixture: ComponentFixture<ApplicationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
