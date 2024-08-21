import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateUpdateComponent } from './candidate-update.component';

describe('CandidateUpdateComponent', () => {
  let component: CandidateUpdateComponent;
  let fixture: ComponentFixture<CandidateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
