import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionManageComponent } from './position-manage.component';

describe('PositionManageComponent', () => {
  let component: PositionManageComponent;
  let fixture: ComponentFixture<PositionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
