import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdateComponent } from './company-update.component';

describe('CompanyUpdateComponent', () => {
  let component: CompanyUpdateComponent;
  let fixture: ComponentFixture<CompanyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
