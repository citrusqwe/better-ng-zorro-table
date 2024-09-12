import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnsModalComponent } from './custom-columns-modal.component';

describe('CustomColumnsModalComponent', () => {
  let component: CustomColumnsModalComponent;
  let fixture: ComponentFixture<CustomColumnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomColumnsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomColumnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
