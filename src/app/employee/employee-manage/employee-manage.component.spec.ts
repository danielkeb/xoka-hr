import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageComponent } from './employee-manage.component';

describe('EmployeeManageComponent', () => {
  let component: EmployeeManageComponent;
  let fixture: ComponentFixture<EmployeeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
