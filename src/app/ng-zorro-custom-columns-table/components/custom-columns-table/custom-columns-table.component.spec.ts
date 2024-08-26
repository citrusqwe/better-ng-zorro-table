import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnsTableComponent } from './custom-columns-table.component';

describe('CustomColumnsTableComponent', () => {
  let component: CustomColumnsTableComponent;
  let fixture: ComponentFixture<CustomColumnsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomColumnsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomColumnsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
