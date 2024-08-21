import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListItemsComponent } from './main-list-items.component';

describe('MainListItemsComponent', () => {
  let component: MainListItemsComponent;
  let fixture: ComponentFixture<MainListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainListItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
