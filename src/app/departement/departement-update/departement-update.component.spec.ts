import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementUpdateComponent } from './departement-update.component';

describe('DepartementUpdateComponent', () => {
  let component: DepartementUpdateComponent;
  let fixture: ComponentFixture<DepartementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartementUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
