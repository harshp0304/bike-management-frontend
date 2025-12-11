import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBikeComponent } from './edit-bike.component';

describe('EditBikeComponent', () => {
  let component: EditBikeComponent;
  let fixture: ComponentFixture<EditBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
